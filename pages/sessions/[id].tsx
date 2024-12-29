import {useRouter} from "next/router";
import {Button, Table} from "react-bootstrap";
import AddDrinkDialogue from "../../components/AddDrinkDialogue";
import {useEffect, useState} from "react";
import post from "../../lib/ajax/post";
import React from "react";
import moment from "moment";
import BottomDrawer from "../../components/BottomDrawer";
import put from "../../lib/ajax/put";
import CooldownTimer from "../../components/CooldownTimer";

export default function Session() {
    const router = useRouter()
    const { id:sessionId, finished: fString } = router.query
    const [modalShow, setModalShow] = useState(false)
    const [bars, setBars] = useState(new Map)
    const [beverages, setBeverages] = useState(new Map)
    const [drinks, setDrinks] = useState([])
    const [secondsTillNextDrink, setSecondsTillNextDrink] = useState(0)
    const disabled = fString == 'true'

    const saveDrink = async (saveData) => {
        const time = Math.floor((new Date().getTime())/1000)
        const res = await post(`/api/sessions/${sessionId}/drinks`, {
            beverage_id: saveData.beverageId,
            bar_id: saveData.barId,
            session_id: sessionId,
            time: time,
        })

        const {id} = await res.json()

        setDrinks([{
            id,
            beverage_id: saveData.beverageId,
            bar_id: saveData.barId,
            time: time,
        }, ...drinks])

        setSecondsTillNextDrink(prev => prev + 3600)
    }

    const onSave = async (saveData) => {
        try {
            await saveDrink(saveData)
        } finally {
            setModalShow(false);
        }
    }

    const onClickFn = (drinkId) => {
        return async () => {
            const drink = drinks.find(drink => drink.id === drinkId)
            await saveDrink({
                beverageId: drink.beverage_id,
                barId: drink.bar_id
            })
        }
    }

    const finishSession = async () => {
        await put(`/api/sessions/${sessionId}`, {
            end_ts: (new Date().getTime()/1000)
        })

        await router.push("/sessions")
    }

    useEffect(() => {
        if (!router.isReady || !router.query.id) return;

        Promise.all([
            fetch('/api/bars').then(res => res.json()),
            fetch('/api/beverages').then(res => res.json()),
            fetch(`/api/sessions/${sessionId}/drinks`).then(res => res.json()),
        ]).then(([bars, beverages, fetchedDrinks]) => {
            const barMap = new Map()
            const beverageMap = new Map()
            const drinks = []
            bars.map(bar => barMap.set(bar.id.toString(), bar))
            beverages.map(beverage => beverageMap.set(beverage.id.toString(), beverage))
            fetchedDrinks.map(drink => drinks.push(drink))
            setBars(barMap)
            setBeverages(beverageMap)
            setDrinks(drinks)
        })
    }, [router.isReady, router.query.id]);


    return (
        <>
        {secondsTillNextDrink > 0 && <CooldownTimer remainingSeconds={secondsTillNextDrink} setRemainingSeconds={setSecondsTillNextDrink} />}
            <Table striped>
                <thead>
                <tr>
                    <td>Time</td>
                    <td>Drink</td>
                    <td>Bar</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                {drinks.map(drink => {
                    return (
                        <React.Fragment key={drink.id}>
                        <tr>
                            <td>{moment.unix(drink.time).format("YYYY-MM-DD hh:mm")}</td>
                            <td>{beverages.get(drink.beverage_id.toString()).name}</td>
                            <td>{bars.get(drink.bar_id.toString()).name}</td>
                            <td>
                                <Button onClick={onClickFn(drink.id)} disabled={disabled}>+</Button>
                            </td>
                        </tr>
                        </React.Fragment>
                    )
                })}
                </tbody>
            </Table>
            <BottomDrawer>
                <Button variant="primary" size={"lg"} className={"w-100"} onClick={() => setModalShow(true)} disabled={disabled}>Add Drink</Button>
                <Button variant="danger" size={"lg"} className={"w-100"} style={{marginTop: "5px"}} onClick={() => finishSession()} disabled={disabled}>Finished</Button>
            </BottomDrawer>
            <AddDrinkDialogue modalShow={modalShow} setModalShow={setModalShow} onSave={onSave} bars={bars} beverages={beverages}/>
        </>
    )
}