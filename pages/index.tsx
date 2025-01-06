import {Card} from "react-bootstrap";
import {useEffect, useState} from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

interface Sums {
    monthDaily: {date: string, sum: number}[];
    daySum: number;
    weekSum: number;
    monthSum: number;
}

export default function Index() {
    const [sums, setSums] = useState<Sums>({
        monthDaily: [],
        daySum: 0,
        weekSum: 0,
        monthSum: 0,
    });
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/index-summary')
        .then((res) => res.json())
        .then((res) => setSums(res))
        .finally(() => setIsLoading(false));
    }, [])

    if(isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{padding: '5px'}}>
            <Card style={{marginTop: '5px', padding: '5px'}}>
                <Card.Title>Drinks in the last day...</Card.Title>
                <Card.Body>
                    <Card.Text><h1>{sums.daySum}</h1></Card.Text>
                </Card.Body>
            </Card>
            <Card style={{marginTop: '5px', padding: '5px'}}>
                <Card.Title>Drinks in the last 7 days...</Card.Title>
                <Card.Body>
                    <Card.Text><h1>{sums.weekSum}</h1></Card.Text>
                </Card.Body>
            </Card>
            <Card style={{marginTop: '5px', padding: '5px'}}>
                <Card.Title>Drinks in the last 30 days...</Card.Title>
                <Card.Body>
                    <Card.Text><h1>{sums.monthSum}</h1></Card.Text>
                </Card.Body>
            </Card>
            <Card style={{marginTop: '5px', padding: '5px'}}>
                <Card.Title>Daily drinks over the last 30 days</Card.Title>
                <Card.Body>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={sums.monthDaily} height={200}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="sum" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>
        </div>
    )
}