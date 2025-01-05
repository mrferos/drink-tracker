import db from "../../lib/db";
import moment from "moment";

const daySecs = 86400;

export default async function handler(req: any, res: any) {
    const time = Date.now()/1000;
    const { daySum, weekSum, monthSum } = await getCounts(time)

    const monthDaily = await getMonthDaily(time)

    return res.status(200).json({
        monthDaily: monthDaily,
        daySum,
        weekSum,
        monthSum,
    })
}

const getMonthDaily = async (time: number): Promise<{date: string, sum: number}[]> => {
    const greaterThanTime = moment.unix(time - (daySecs * 30))
    const sumsByDay = await db("session_drinks")
        .select(
            db.raw("strftime('%Y-%m-%d', time, 'unixepoch') as day"),
            db.raw('count(id) as sum')
        )
        .where("time", ">", greaterThanTime.unix())
        .groupBy("day")

    const sumMap = sumsByDay.reduce((map, item) => {
        map[item.day] = item.sum;
        return map
    }, {})

    const allDaysMap = {}
    const last = moment.unix(time)
    let cur = greaterThanTime
    while(cur.isBefore(last)) {
        const prettyDate = cur.format("YYYY-MM-DD")
        if(sumMap[prettyDate]) {
            allDaysMap[prettyDate] = sumMap[prettyDate]
        } else {
            allDaysMap[prettyDate] = 0
        }

        cur = cur.add(1, 'day')
    }

    const results = []
    Object.entries(allDaysMap).forEach(([key, value]) => {
        results.push({
            date: key,
            sum: value
        })
    })

    return results
}

const getCounts = async (time: number): Promise<{daySum: number, weekSum: number, monthSum: number}> => {
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

    return {
        daySum,
        weekSum,
        monthSum,
    }
}