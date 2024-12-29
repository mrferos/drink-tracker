import {useEffect, useState} from "react";
import {Alert} from "react-bootstrap";
import moment from "moment";
import momentSetup from "moment-duration-format";

momentSetup(moment)

export default function CooldownTimer({ remainingSeconds, setRemainingSeconds }) {
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingSeconds(prev => prev - 1)
        }, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <Alert variant="danger" style={{margin: "5px"}}>
            <Alert.Heading>Time till next drink...</Alert.Heading>
            <p className="mb-0 text-center" style={{fontSize: "75px"}}>
                {moment.duration(remainingSeconds, "seconds").format()}
            </p>
        </Alert>
    )
}