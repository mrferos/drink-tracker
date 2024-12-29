import {useEffect, useState} from "react";
import {Alert} from "react-bootstrap";
import moment from "moment";
import momentSetup from "moment-duration-format";

// @ts-ignore
momentSetup(moment)

export default function CooldownTimer({ timeForNextDrink }) {
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDuration(timeForNextDrink - moment().unix())
        }, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [timeForNextDrink]);

    if(duration === 0){
        return null
    }

    return (
        <Alert variant="danger" style={{margin: "5px"}}>
            <Alert.Heading>Time till next drink...</Alert.Heading>
            <p className="mb-0 text-center" style={{fontSize: "75px"}}>
                {moment.duration(duration, 'seconds').format()}
            </p>
        </Alert>
    )
}