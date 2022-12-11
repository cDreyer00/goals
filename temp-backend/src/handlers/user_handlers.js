import {loginUserService, getAllUsersService, createUserService} from "../services/user_services.js"

export async function loginUserHandler(req, res) {
    const {email, password} = req.body;
    
    if(!email || !password){
        return res.status(400).send("need fill all fields");
    }
    const users = await loginUserService({email, password});
    users.rows.test = "aaa";
    console.log(users.rows.test)
    return res.json(users);
}

export async function createUserHandler(req, res){
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).send("nedd fill all fields");
    }

    const result = await createUserService({name, email, password});
}
