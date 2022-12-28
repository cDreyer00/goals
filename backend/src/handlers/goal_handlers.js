import { getGoalsService, createGoalService, editGoalService, deleteGoalService } from "../services/goal_services.js"
import { authUser, checkAuth } from "../auth.js";
import cookieParser from "cookie-parser";
export async function createGoalHandler(req, res) {
    let { title, description, value, current_value, due_date, edit, status } = req.body;
    
    if(!edit || (edit != 0 && edit != 1)) edit = 0;
    
    const possibleStatuses = ["Pending", "Done", "Failed"];
    
    if(!possibleStatuses.includes(status)) status = "Pending";

    const token = req.headers.token;
    const user_id = checkAuth(token).id;

    try{
        const result = await createGoalService({
            title,
            description,
            value,
            current_value,
            due_date,
            edit,
            status,
            user_id
        });
        return res.json(result);
    }catch(e){        
        return res.status(500).json({message: e});
    }

}

export async function getUserGoalsHandler(req, res) {

    const token = req.headers.token;    
    const user_id = checkAuth(token).id;    
    
    let user_goals = await getGoalsService({ user_id });

    return res.json(user_goals);
}

export async function editGoalHandler(req, res) {
    const { id, title, description, value, current_value, due_date } = req.body;

    if (!id || !title || !description || !due_date) {
        return res.status(400).send("one or more requirements missing");
    }

    try {
        await editGoalService({ id, title, description, value, current_value, due_date });
        return res.send("goal edited succesfully");
    } catch (e) {
        return res.status(500).send(e);
    }
}

export async function deleteGoalHandler(req, res) {
    
    const user = checkAuth(req.headers.token);
    if(!user){
        return res.status(400).send("Not authorized");
    }

    const { id } = req.body
    if(!id) return res.status(400).send("Goal identifier required");
    
    try{
        await deleteGoalService({id});
        return res.send("Goal deleted succesfully");
    }catch(e){
        return res.status(500).send(e.message);
    }
}