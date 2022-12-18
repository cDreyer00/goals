import { loginUserService, getAllUsersService, createUserService } from "../services/user_services.js"
import { hash } from "../cypher.js"
import { authUser, convertToObject } from "../auth.js";

export async function loginUserHandler(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("need fill all fields");
    }

    const hashedPass = hash(password);
    const result = await loginUserService({ email, hashedPass });
    if (result.rows == 0) return res.status(400).send("Account not found")

    const user = convertToObject(result)[0];

    res.cookie('User_Auth', authUser(user));
    
    return res.json(user);
}

export async function createUserHandler(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("ned fill all fields");
    }
    const hashedPass = hash(password);
    const result = await createUserService({ name, email, hashedPass });

    return res.json(result);
}