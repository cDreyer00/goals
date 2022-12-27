import connection from "./connection.js";

export default class Database {

    execute(sql, values) {
        return new Promise(async (resolve, reject) => {
            await connection().then(db => {
                db.execute(sql, values, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve("Operation succeeded");
                    }
                });
                db.commit();
            })
                .catch(e => reject(e));

        })
    }

    getValues(table) {
        const sql = `SELECT * FROM ${table}`;
        return new Promise(async (resolve, reject) => {
            
            await connection()
                .then(async (db) => {
                    let { metaData, rows } = await db.execute(sql);                    
                    metaData = metaData.map(column => {
                        return { name: column.name.toLowerCase() };
                    });
                    const result = rows.map(row => {
                        return metaData.reduce((obj, column, index) => {
                            obj[column.name] = row[index];
                            return obj;
                        }, {});
                    });
                    resolve(result);
                })
                .catch((e) => reject(e))
        })
    }

}


// const dbase = new Database();


// dbase.execute(`INSERT INTO goals
//                     (title, description, value, current_value, edit, status, user_id)
//                 VALUES
//                     (:title, :description, :value, :current_value, :edit, :status, :user_id)
//                  `, ["title", "description", 999, 444, 0, "Pending", "0"])


// dbase.getValues("goals")
//     .then((users) => console.log(users))
//     .catch((err) => console.log(err));