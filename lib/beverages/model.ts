import db from "../db";

export class Beverage {
    id: number;
    name: string;
    proof_percentage: number;
    volume_in_ml: number;
}

export async function create(beverage: Beverage): Promise<Beverage> {
    const [id] = await db.insert({
        name: beverage.name,
        proof_percentage: beverage.proof_percentage,
        volume_in_ml: beverage.volume_in_ml
    }).into('beverages');

    const b = new Beverage();
    b.id = id;
    b.name = beverage.name;
    b.proof_percentage = beverage.proof_percentage;
    b.volume_in_ml = beverage.volume_in_ml;

    return b;
}

export async function findBy(args: any): Promise<Beverage[]> {
    const resp = await db('beverages').select('*').where(args);
    if(!resp) return [];

    return resp.map((r: any) => {
        const b = new Beverage();
        b.id = r.id;
        b.name = r.name;
        b.proof_percentage = r.proof_percentage;
        b.volume_in_ml = r.volume_in_ml;
        return b
    })
}