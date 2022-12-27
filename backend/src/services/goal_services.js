import Database from "../database/database.js"
const db = new Database();

export async function createGoalService({ title, description, value, current_value, due_date, user_id, edit, status }) {

    due_date = new Date(due_date);

    const query = `
    INSERT INTO 
        goals(title, description, value, current_value, due_date, edit, user_id, status)
    VALUES
        (:title, :description, :value, :current_value, :due_date, :edit, :user_id, :status)
    `
    const values = [title, description, value, current_value, due_date, edit, user_id, status]

    return await db.execute(query, values);
}

export async function getGoalsService({ user_id }) {
    return db.getValues('goals')
        .then((goals) => {
            return goals.filter((goal) => {                
                if (goal.user_id == user_id){
                    return goal;
                }
            })
        })
        .catch((err) => { throw err });
}

export async function editGoalService({ id, title, description, value, current_value, due_date }) {

    try {
        const query = `UPDATE goals 
            SET title = :title, description = :description, value = :value, current_value = :current_value, due_date = TO_DATE(:due_date, 'YYYY-MM-DD')
            WHERE id = :id            
            `
        const values = { id, title, description, value, current_value, due_date };

        return await execute(query, values);

    } catch (e) {
        throw new Error(e);
    }
}
export async function deleteGoalService({ id }) {
    try {
        const query = `DELETE FROM goals WHERE id = :id`;
        const values = { id: id };

        return await execute(query, values);
    } catch (error) {
        throw new Error(error);
    }
}