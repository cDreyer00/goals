import { execute, usersTable } from "../database.js"

export async function loginUserService({ email, password }) {
    try {
        const query = `SELECT * FROM ${usersTable} WHERE email = '${email}' AND password = '${password}'`
        return await execute(query)
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
}

export async function createUserService({ name, email, hashedPass }) {
    try {
        const query = `INSERT INTO ${usersTable}(name, email, password) VALUES ('${name}', '${email}', '${hashedPass}')`
        return await execute(query);
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
