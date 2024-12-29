import {update, findBy} from "../../../lib/sessions/model";

export default async function handler(req: any, res: any) {
    const {id} = req.query;
    if(typeof id !== "string") {
        res.status(400).json({text: "Invalid request path"})
    }

    if(req.method === "PUT") {


        await update(id, req.body)
        return res.status(200).send({})
    } else if (req.method === "GET") {
        const resp = await findBy({id})
        if(!resp) {
            return res.status(404).send({text: "Not Found"})
        }

        res.status(200).json(resp[0])
    } else {
        res.setHeader('Allow', ['GET']).status(405).json({text: "Method not allowed"})
    }
}