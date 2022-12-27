import OracleDB from "oracledb";
import "dotenv/config"
import request from "request";


//OracleDB.initOracleClient({ libDir: '../../oracle_instant/instantclient_21_7' });
//testname
//test
//Cristian@123

export default function connection() {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await OracleDB.getConnection({ user: "admin", password: process.env.AD_PASSWORD, connectString: `${process.env.AD_USERNAME}_high`, cloud: true });
            resolve(db);
        } catch (e) {
            reject(e);
        }
    });
}

// CREATE MAIN TABLES

async function createUsersTable() {
    console.log("creating");
    const createUsersTable = `
      CREATE TABLE users (
          id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          name VARCHAR2(255) NOT NULL,
          email VARCHAR2(255) NOT NULL,
          password VARCHAR2(255) NOT NULL
          )`;

    await connection().then(db => db.execute(createUsersTable));
}

async function createGoalsTable() {
    const createGoalsTable = `
        CREATE TABLE goals (
          id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          title VARCHAR2(255),
          description VARCHAR2(255),
          due_date DATE,
          value NUMBER,
          current_value NUMBER,
          edit NUMBER,
          status VARCHAR2(255) NOT NULL,
          user_id NUMBER,
          CHECK (status IN ('Done', 'Pending', 'Failed'))
        )`;

    await connection().then(db => db.execute(createGoalsTable));
}


// createUsersTable();
// createGoalsTable();
