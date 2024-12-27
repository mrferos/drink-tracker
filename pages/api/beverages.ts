import {findBy, create} from "../../lib/beverages/model";

export default async function handler(req: any, res: any) {
    if (req.method == "POST") {
        const beverage = await create(req.body)
        res.status(200).json(beverage)
    } else if (req.method == "GET") {
        const beverages = await findBy({})
        res.status(200).json(beverages)
    } else {
        res.setHeader('Allow', ['GET', 'POST']).status(405).json({text: "Method not allowed"})
    }
}