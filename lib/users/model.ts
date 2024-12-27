import 'server-only'
import db from "../db";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import config from "../config";

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export class LoginResponse {
    user: User;
    token: string;
}

class Token {
    id: number;
    tokenTime: Date;
}

export async function validateToken(token: string): Promise<boolean> {
    const onlineJwtSecret = await config.get('jwt.online_secret')
    if(onlineJwtSecret === false) {
        return false;
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET + onlineJwtSecret);
    if(!isToken(decoded)) return false;
}

export async function authenticate(email: string, password: string): Promise<LoginResponse|false> {
    const user = await findOneBy({email});
    if(!user) return false;

    if(!bcrypt.compareSync(password, user.password)) return false;

    const onlineJwtSecret = await config.get('jwt.online_secret')
    if(onlineJwtSecret === false) {
        return false;
    }

    const token = new Token();
    token.id = user.id
    token.tokenTime = new Date();

    const loginResponse = new LoginResponse();
    loginResponse.user = user;
    loginResponse.token = JWT.sign(token, process.env.JWT_SECRET + onlineJwtSecret);

    return loginResponse
}

export async function findOneBy(args: any): Promise<User|false> {
    const resp = await db.select().from('users').where(args).first();
    if(!resp) return false;

    const u = new User()
    u.email = resp.email;
    u.name = resp.name;
    u.id = resp.id
    u.password = resp.password;

    return u
}

export async function create(user: User, plainPassword: string): Promise<User> {
    const password = hashPassword(plainPassword);
    const [id] = await db.insert({
        name: user.name,
        email: user.email,
        password
    }).into('users');

    const u = new User()
    u.email = user.email;
    u.name = user.name;
    u.id = id

    return u
}

export function hashPassword(plainPassword: string): string {
    return bcrypt.hashSync(plainPassword, 10);
}

function isToken(obj: any): obj is Token {
    return obj.id && obj.tokenTime
}