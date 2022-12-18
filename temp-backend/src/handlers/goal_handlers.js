import { getGoalsService, createGoalService } from "../services/goal_services.js"
import { userIn } from "../auth.js";

export async function createGoalHandler(req, res) {
    const { title, description, value, current_value, due_date } = req.body;    

    const user_id = userIn.ID;

    const newGoal = await createGoalService({
        title,
        description,
        value,
        current_value,
        due_date,
        user_id
    });

    return res.json({ newGoal });
}

export async function getUserGoalsHandler(req, res) {
    const user_id = userIn.ID;

    let user_goals = await getGoalsService({ user_id });

    return res.json(user_goals);
}

export async function editGoalHandler(req, res){
    const { title, description, value, current_value, due_date } = req.body;

    if(!id){
        return res.status(400).send("no goal id provided");
    }
}

export async function deleteGoalHandler(req, res){
    const {id} = req.body

    if(!id){
        return res.status(400).send("no goal id provided");
    }
}