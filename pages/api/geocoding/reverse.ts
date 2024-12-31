import {NextApiRequest, NextApiResponse} from "next";
import reverseLookup from "../../../lib/geocoding/reverse";

interface reverseRequest {
    lon: string;
    lat: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "POST") {
        return res.status(400).json({text: "Invalid request method"})
    }

    const {lat, lon} = req.body;
    const resp = await reverseLookup({lat, lon});
    return res.status(200).json(resp);
}
