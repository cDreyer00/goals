import Database from "../database/database.js"

const db = new Database();

export function loginUserService(email, hashedPass) {
    return db.get("users")
        .then((users) => {
            return users.find((user) => user.email == email && user.password == hashedPass);
        })
        .catch((err) => { throw err })
}

export function createUserService({ name, email, hashedPass }) {
    const sql = `INSERT INTO users(name, email, password) VALUES (?, ?, ?)`;
    const values = [name, email, hashedPass];
    return db.post(sql, values)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            throw err
        });
}

export async function getAllUsersService() {
    return db.get("users")
        .then((users) => users)
        .catch((err) => { throw err });
}