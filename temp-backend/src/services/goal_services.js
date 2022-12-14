import { execute, goalsTable } from "../database.js";

export async function createGoalService({ title, description, value, current_value, due_date, user_id }) {

    due_date = new Date(due_date.year, due_date.month, due_date.day);
    due_date = due_date.toISOString().substring(0, 10);

    try {
        const query = `
        INSERT INTO 
            ${goalsTable}(title, description, value, due_date, current_value, user_id)
        VALUES
             (:title, :description, :value, TO_DATE(:due_date, 'YYYY-MM-DD'), :current_value, :user_id)
        `
        const values = { title, description, value, due_date, current_value, user_id }

        return await execute(query, values);
    } catch (error) {
        throw new Error(error);
    }
}


export async function getGoalsService({ user_id }) {
    try {
        const query = `
            SELECT * FROM ${goalsTable}
                WHERE
                    user_id = :user_id
        `
        return await execute(query, {user_id});
    } catch (error) {
        throw new Error(error);
    }
}