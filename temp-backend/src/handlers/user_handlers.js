import { loginUserService, getAllUsersService, createUserService } from "../services/user_services.js"
import { hash } from "../cypher.js"
import { authUser } from "../auth.js";

export async function loginUserHandler(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("need fill all fields");
    }

    const hashedPass = hash(password);
    const result = await loginUserService({ email, hashedPass });
    if (result == 0) return res.status(400).send("Account not found")

    res.cookie('User_Auth', authUser(result.rows[0]));

    return res.json(result);
}

export async function createUserHandler(req, res) {
    const { name, email, password } = req.body;
    console.log("create");
    if (!name || !email || !password) {
        return res.status(400).send("ned fill all fields");
    }
    const hashedPass = hash(password);
    const result = await createUserService({ name, email, hashedPass });

    return res.json(result);
}