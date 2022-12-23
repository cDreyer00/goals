import Database from "../database/database.js"

const db = new Database();

export function loginUserService(email, hashedPass) {
    return db.getValues("users")
        .then((users) => {
            return users.find((user) => user.email == email && user.password == hashedPass);
        })
        .catch((err) => err)
}

export function createUserService({ name, email, hashedPass }) {

    const sql = `INSERT INTO users(name, email, password) VALUES (?, ?, ?)`;
    const values = [name, email, hashedPass];

    return db.execute(sql, values)
        .then((res) => {
            return res;
        })
        .catch((err) => { throw err });
}

export async function getAllUsersService() {
    try {
        const sql = `SELECT * FROM users`;
        return await execute(sql);
    } catch (err) {
        return err.message;
    }
}

export async function getUserService({ id }) {
    try {
        const sql = `SELECT * FROM users WHERE id=${id}`;
        return await execute(sql);
    } catch (err) {
        return err.message;
    }
}