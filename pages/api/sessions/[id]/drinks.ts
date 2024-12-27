import {NextApiRequest, NextApiResponse} from "next";
import {getSessionDrinks, insertSessionDrink, SessionDrink} from "../../../../lib/sessions/model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query;
    if(!isString(id)) {
        res.status(400).json({text: "Invalid request path"})
        return
    }

    if(req.method === "POST") {
        if(!isSessionDrink(req.body)) {
            res.status(400).json({text: "Invalid request body"})
        }

        const sd = await insertSessionDrink(id, req.body)
        res.status(200).json(sd)
    } else if (req.method === "GET") {
        const sd = await getSessionDrinks(id)
        res.status(200).json(sd)
    } else {
        res.setHeader('Allow', ['GET', 'POST']).status(405).json({text: "Method not allowed"})
    }
}

function isString(value: any): value is string {
    return typeof value === "string";
}

function isSessionDrink(drink: any): drink is SessionDrink {
    return drink.beverage_id !== undefined && drink.bar_id !== undefined;
}
