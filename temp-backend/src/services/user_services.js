import OracleDB from "oracledb";
OracleDB.initOracleClient({ libDir: 'C:/oracle/instantclient_21_7' });

async function execute(query) {
    const db = await OracleDB.getConnection({ user: "admin", password: process.env.ORACLE_DB_PASSWORD, connectionString: "GOALSDB_high" });
    const result = await db.execute(query);
    db.close();
    return result;
}

const usersTable = "users";
const goalsTable = "goals";

export async function loginUserService({ email, password }) {
    try {
        return await execute("drop table nodtab")
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
}


// connection = await OracleDB.getConnection({ user: "admin", password: process.env.ORACLE_DB_PASSWORD, connectionString: "GOALSDB_high" });

// // Create a table

// await connection.execute("drop table nodetab;");
// await connection.execute(`create table nodetab (id number, data varchar2(20))`);

// // Insert some rows

// const sql = `INSERT INTO nodetab VALUES (:1, :2)`;

// const binds =
//     [[1, "Firste"],
//     [2, "Second"],
//     [3, "Third"],
//     [4, "Fourth"],
//     [5, "Fifth"],
//     [6, "Sixth"],
//     [7, "Seventh"]];

// await connection.executeMany(sql, binds);

// connection.commit();     // uncomment to make data persistent

// // Now query the rows back

// const result = await connection.execute(`SELECT * FROM nodetab`);

// console.dir(result.rows, { depth: null });

//     } catch (err) {
//     console.error(err);
// } finally {
//     if (connection) {
//         try {
//             await connection.close();
//         } catch (err) {
//             console.error(err);
//         }
//     }
