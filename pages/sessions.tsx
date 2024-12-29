import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import AddItemButton from "../components/AddItemButton";
import AddSessionDialogue from "../components/AddSessionDialogue";
import post from "../lib/ajax/post";
import {useRouter} from "next/router";
import Head from "next/head";
import moment from "moment";
import Link from "next/link";
import CooldownTimer from "../components/CooldownTimer";

export default function Sessions() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false)
    const router = useRouter();

    const onSave = async (saveData) => {
        try {
            const res = await post('/api/sessions', {
                name: saveData.name,
                startTs: Math.floor(Date.now() / 1000),
            })

            const {id} = await res.json()
            setData([...data, {
                id: id,
                name: saveData.name,
            }])

            await router.push('/sessions/' + id)
        } finally {
            setModalShow(false);
        }
    }

    useEffect(() => {
        fetch('/api/sessions')
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
                <title>Sessions</title>
            </Head>
            <Table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                { data.map(row => {
                    const startDate = moment.unix(row.startTs).format('YYYY-MM-DD HH:mm')
                    let endDate = null
                    let finished = ''
                    if(row.endTs) {
                        endDate = moment.unix(row.endTs).format('YYYY-MM-DD HH:mm')
                        finished = '?finished=true'
                    }



                    return (
                        <tr key={row.id}>
                            <td>{row.name}</td>
                            <td>{startDate}</td>
                            <td>{endDate}</td>
                            <td>
                                <Link href={"/sessions/" + row.id + finished}>View</Link>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <AddItemButton title={"Start Session"} showElement={setModalShow}/>
            <AddSessionDialogue modalShow={modalShow} setModalShow={setModalShow} onSave={onSave} />
        </>
    )
}