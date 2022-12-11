import { execute, usersTable } from "../database.js"
import OracleDB from "oracledb";

export async function loginUserService({ email, password }) {
    try {
        const query = `SELECT * FROM ${usersTable} WHERE email = '${email}'`
        return await execute(query)
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
}

export async function createUserService({ name, email, password }) {
    try {
        const query = `INSERT INTO ${usersTable}(name, email, password) VALUES ('${name}', '${email}', '${password}')`
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

export async function getUserService({ }) {

}
