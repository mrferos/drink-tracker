import 'server-only'
import db from "../db";

export class Bar {
    id: number;
    name: string;
    lat: number;
    long: number;
}

export async function create(bar: Bar): Promise<Bar> {
    const [id] = await db.insert({
        name: bar.name,
        lat: bar.lat,
        long: bar.long
    }).into('bars');

    const b = new Bar();
    b.id = id;
    b.name = bar.name;
    b.lat = bar.lat;
    b.long = bar.long;
    return b
}

export async function findBy(args: any): Promise<Bar[]> {
    const resp = await db('bars').select('*').where(args);
    if(!resp) return [];

    return resp.map((r: any) => {
        const b = new Bar();
        b.id = r.id;
        b.name = r.name;
        b.lat = r.lat;
        b.long = r.long;
        return b
    })
}

