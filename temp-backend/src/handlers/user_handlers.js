import {loginUserService} from "../services/user_services.js"

export async function loginUserHandler(req, res) {
    const {email, password} = req.body;
    
    if(!email || !password){
        return res.status(400).send("need fill all fields");
    }

    const users = await loginUserService({email, password});

    return res.json(users);
}

export async function createUserHandler(req, res){

}
