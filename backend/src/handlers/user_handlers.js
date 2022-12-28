import { loginUserService, getAllUsersService, createUserService } from "../services/user_services.js"
import { hash } from "../cypher.js"
import { authUser } from "../auth.js";

export async function loginUserHandler(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Need fill all fields");
    }

    const hashedPass = hash(password);
    try {
        const user = await loginUserService(email, hashedPass);

        if (!user) {
            return res.status(400).send("Account not found");
        }

        const token = authUser(user);

        req.headers.authorization = "Bearer " + token;

        return res.json({token: token, user: user});
    } catch (e) {
        res.status(500).send("A server error has ocurred");
    }
}

export async function createUserHandler(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("need fill all fields");
    }
    const hashedPass = hash(password);

    try {
        const result = await createUserService({ name, email, hashedPass });
        return res.json(result);
    } catch (e) {
        return res.status(500).json(e.message)
    }
}

export async function getAllUsersHandler(req, res) {
    console.log(req.headers.aaa);
    if(req.headers.authorization == "specialkey"){
        return res.json(await getAllUsersService());
    }
    return res.status(400).send("not authorized");
}