import {findOneBy, User, create} from "../../lib/users/model";

export default async function handler(req, res) {
    if(process.env.SIGNUP_ENABLED !== 'true') {
        return res.status(404).end('Signup is disabled')
    }

    if(req.method !== 'POST') {
        return res.status(405).end();
    }

    const body = req.body;
    if(!isSignup(body)) {
        return res.status(400).end();
    }

    const signup: Signup = body;

    const check = await findOneBy({email: signup.email});
    if(check !== false) {
        return res.status(400).end();
    }

    const signupUser = new User()
    signupUser.name = signup.name;
    signupUser.email = signup.email;

    const user = await create(signupUser, signup.password);
    res.status(200).json(user);
}

interface Signup {
    name: string;
    email: string;
    password: string;
}

function isSignup(obj: any): obj is Signup {
    return 'name' in obj && 'email' in obj && 'password' in obj;
}