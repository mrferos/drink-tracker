import {update} from "../../../lib/sessions/model";

export default async function handler(req: any, res: any) {
    if(req.method !== "PUT") {
        return res.status(403).send({})
    }

    const {id} = req.query;
    if(typeof id !== "string") {
        res.status(400).json({text: "Invalid request path"})
    }

    await update(id, req.body)
    return res.status(200).send({})
}