import 'server-only'
import db from "../db";

export class Bar {
    id: number;
    name: string;
    lat: number;
    long: number;
    city: string;
    state: string;
}

export async function create(bar: Bar): Promise<Bar> {
    const [id] = await db.insert({
        name: bar.name,
        lat: bar.lat,
        long: bar.long,
        city: bar.city,
        state: bar.state,
    }).into('bars');

    const b = new Bar();
    b.id = id;
    b.name = bar.name;
    b.lat = bar.lat;
    b.long = bar.long;
    b.state = bar.state;
    b.city = bar.city;
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
        b.state = r.state;
        b.city = r.city;
        return b
    })
}

