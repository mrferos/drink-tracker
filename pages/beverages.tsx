import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import AddItemButton from "../components/AddItemButton";
import AddBeverageDialogue from "../components/AddBeverageDialogue";
import post from "../lib/ajax/post";
import Head from "next/head";

export default function Beverages() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const onSave = async (saveData) => {
        try {
            const res = await post('/api/beverages', {
                name: saveData.name,
                proof_percentage: saveData.proof,
                volume_in_ml: saveData.volume,
            });

            const {id} = await res.json()

            setData([...data, {
                id: id,
                name: saveData.name,
                proof_percentage: saveData.proof,
                volume_in_ml: saveData.volume,
            }])
        } finally {
            setModalShow(false);
        }
    }

    useEffect(() => {
        fetch('/api/beverages')
            .then(res => res.json())
            .then(data => setData(data))
            .finally(() => setIsLoading(false))
    }, [])

    if(isLoading) return (
        <div>Loading...</div>
    )

    return (
        <>
            <Head>
                <title>Beverages</title>
            </Head>
            <Table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Proof (%)</th>
                    <th>Volume (ml)</th>
                </tr>
                </thead>
                <tbody>
                { data.map(row => (
                    <tr key={row.id}>
                        <td>{row.name}</td>
                        <td>{row.proof_percentage}</td>
                        <td>{row.volume_in_ml}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <AddItemButton title={"Add Beverage"} showElement={setModalShow}/>
            <AddBeverageDialogue modalShow={modalShow} setModalShow={setModalShow} editing={false} onSave={onSave}/>
        </>
    )
}
