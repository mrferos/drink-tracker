import 'server-only'
import db from "../db";

export class Session {
    id: string
    name: string
    startTs: number
    endTs: number
}

export class SessionDrink {
    id: number
   beverage_id: number
   bar_id: number
   time: number
}

export async function getSessionDrinks(sessionId: string): Promise<SessionDrink[]> {
    const resp = await db("session_drinks").select('*').where({session_id: sessionId}).orderBy("time", "desc")
    if(!resp) return []

    return resp.map(row => {
        const s = new SessionDrink()
        s.id = row.id
        s.beverage_id = row.beverage_id
        s.bar_id = row.bar_id
        s.time = row.time
        return s
    })
}

export async function insertSessionDrink(sessionId: string, drink:SessionDrink): Promise<SessionDrink> {
    const [id] = await db("session_drinks").insert({
        session_id: sessionId,
        beverage_id: drink.beverage_id,
        bar_id: drink.bar_id,
        time: drink.time
    })

    const s = new SessionDrink()
    s.id = id
    s.time = drink.time
    s.beverage_id = drink.beverage_id
    s.bar_id = drink.bar_id
    return s
}

export async function update(id: string, args): Promise<Session> {
    await db("sessions").update(args).where({id})
    return (await findBy({id}))[0];
}

export async function create(session: Session): Promise<Session> {
    const [id] = await db("sessions").insert({
        name: session.name,
        start_ts: session.startTs,
        end_ts: session.endTs
    })

    const s = new Session()
    s.id = id
    s.name = session.name
    s.startTs = session.startTs
    s.endTs = session.endTs
    return s
}

export async function findBy(args: any): Promise<Session[]> {
    const resp = await db("sessions").select('*').where(args)
    if(!resp) return []

    return resp.map(row => {
        const s = new Session()
        s.id = row.id
        s.name = row.name
        s.startTs = row.start_ts
        s.endTs = row.end_ts
        return s
    })
}