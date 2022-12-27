import "dotenv/config"
import axios from "axios";


export default class Database {

    post(sql, values) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: 'https://goalsbackend.glitch.me/db',
                params: {
                    sql: sql,
                    values: values
                }
            }).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    get(table) {
        const sql = `SELECT * FROM ${table}`

        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: 'https://goalsbackend.glitch.me/db',
                params: {
                    sql: sql,
                }
            }).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            })
        })
    }

}


const dbase = new Database();

async function createUsersTable() {

    const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
      )`;

    await dbase.post(createUsersTable);
}

async function createGoalsTable() {
    const createGoalsTable = `
    CREATE TABLE IF NOT EXISTS goals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        due_date DATE,
        value NUMERIC,
        current_value NUMERIC,
        edit INTEGER,
        status TEXT NOT NULL,
        user_id NUMERIC,
        CHECK (status IN ('Done', 'Pending', 'Failed'))
      )`;

    await dbase.post(createGoalsTable);
}

createUsersTable();
createGoalsTable();

//dbase.post("DELETE FROM users");
//dbase.post("DELETE FROM goals");