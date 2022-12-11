import { } from "../services/goal_services"

export async function createGoalHandler(req, res) {
    const { title, description, value, achievement_time } = req.body;

    const new_goal = await goalServices.insertGoal({ title, description, value, achievement_time, user_id })
    const allUserGoals = await goalServices.getGoals({ user_id });
    return res.json({ new_goal: new_goal, all_goals: allUserGoals });

    return res.status(400).send("New goals could not be created, try again");
}