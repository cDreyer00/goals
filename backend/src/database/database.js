import db from "./connection.js";

export default class Database {

    execute(sql, values) {
        return new Promise((resolve, reject) => {
            db.run(sql, values, (err) => {
                if (err){
                    reject(err);
                }else{
                    resolve("Operation succeeded");
                }
            });
        })
    }

    getValues(table) {
        const sql = `SELECT * FROM ${table}`;

        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }    
}

// const dbase = new Database();
// dbase.getValues("goals")
// .then((users)=> console.log(users))
// .catch((err) => console.log(err));