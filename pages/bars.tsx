import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import Link from "next/link";
import AddItemButton from "../components/AddItemButton";
import AddBarDialogue from "../components/AddBarDialogue";
import post from "../lib/ajax/post";
import Head from "next/head";

export default function Bars() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const onSave = async (saveData) => {
        try {
            const res = await post('/api/bars', {
                name: saveData.name,
                lat: saveData.lat,
                long: saveData.long,
            });

            const {id} = await res.json()
            setData([...data, {
                id: id,
                name: saveData.name,
                lat: saveData.lat,
                long: saveData.long,
            }])
        } finally {
            setModalShow(false);
        }
    }

    useEffect(() => {
        fetch('/api/bars')
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
                <title>Bars</title>
            </Head>
            <Table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Link to Maps</th>
                </tr>
                </thead>
                <tbody>
                { data.map(row => {
                    const appleMapLink = `http://maps.apple.com/?q=${encodeURI(row.name)}&ll=${row.lat},${row.long}`
                    return (
                        <tr key={row.id}>
                            <td>{row.name}</td>
                            <td><Link href={appleMapLink} target={"_blank"} rel={"noopener noreferrer"}>Apple Maps</Link></td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <AddItemButton title={"Add Bar"} showElement={setModalShow}/>
            <AddBarDialogue modalShow={modalShow} setModalShow={setModalShow} editing={false} onSave={onSave}/>
        </>
    )
}
