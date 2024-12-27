import {findBy, create} from "../../lib/bars/model";

export default async function handler(req: any, res: any) {
    if(req.method == "POST") {
        const bar = await create(req.body)
        res.status(200).json(bar)
    } else if(req.method == "GET") {
        const bars = await findBy({})
        res.status(200).json(bars)
    } else {
        res.setHeader('Allow', ['GET']).status(405).json({text: "Method not allowed"})
    }
}