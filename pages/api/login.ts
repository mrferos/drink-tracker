import {authenticate} from "../../lib/users/model";

export default async function handler(req: any, res: any) {
    const body = req.body;
    if(!isLogin(body)) {
        return res.status(422).end();
    }

   const lr = await authenticate(body.email, body.password);
    if(lr === false) {
        return res.status(401).end();
    }

    res.status(200).json({
        token: lr.token,
        user: {
            name: lr.user.name,
            email: lr.user.email,
            id: lr.user.id,
        }
    });
}

interface login {
    email: string;
    password: string;
}

function isLogin(obj: any): obj is login {
    return 'email' in obj && 'password' in obj;
}