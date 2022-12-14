import { execute, usersTable } from "../database.js"

export async function loginUserService({ email, hashedPass }) {
    // Validate the arguments
    if (!email || typeof email !== "string") {
        throw new Error("Invalid email argument");
    }

    if (!hashedPass || typeof hashedPass !== "string") {
        throw new Error("Invalid password argument");
    }

    try {
        // Use a prepared statement to execute the query
        const query = `SELECT * FROM ${usersTable} WHERE email = :email AND password = :hashedPass`
        const values = { email, hashedPass };
        return await execute(query, values);
    } catch (err) {
        return err;
    }
}

export async function createUserService({ name, email, hashedPass }) {
    try {
        const query = `INSERT INTO ${usersTable}(name, email, password) VALUES (:name, :email, :hashedPass)`
        const values = {name, email, hashedPass};
        return await execute(query, values);
    } catch (err) {
        return err.message;
    }
}

export async function getAllUsersService() {
    try {
        const query = `SELECT * FROM ${usersTable}`;
        return await execute(query);
    } catch (err) {
        return err.message;
    }
}

export async function getUserService({ id }) {
    try {
        const query = `SELECT * FROM ${usersTable} WHERE id=${id}`;
        return await execute(query);
    } catch (err) {
        return err.message;
    }
}
