import {findBy, create} from "../../lib/sessions/model";


export default async function handler(req, res) {
    if(req.method === "POST") {
        const session = await create(req.body)
        res.status(200).json(session);
    } else if(req.method === "GET") {
        const sessions = await findBy(req.query)
        res.status(200).json(sessions);
    } else {
        res.setHeader('Allow', ['GET', 'POST']).status(405).json({text: "Method not allowed"})
    }
}