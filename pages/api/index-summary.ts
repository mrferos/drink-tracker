import db from "../../lib/db";

export default async function handler(req: any, res: any) {
    const time = Date.now()/1000;
    const daySecs = 86400;
    const {sum:daySum} = await db("session_drinks")
        .count("id as sum")
        .where("time",  ">",  time-daySecs)
        .first()

    const {sum:weekSum} = await db("session_drinks")
        .count("id as sum")
        .where("time",  ">",  time-(daySecs * 7))
        .first()

    const {sum:monthSum} = await db("session_drinks")
        .count("id as sum")
        .where("time",  ">",  time-(daySecs * 30))
        .first()

    return res.status(200).json({
        daySum,
        weekSum,
        monthSum,
    })
}