import { createRequire } from "module"
const require = createRequire(import.meta.url);
require("dotenv").config();

const oracledb = require("oracledb");

oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_21_7' });

export async function run() {

    let connection;

    try {
        console.log(process.env.ORACLE_DB_PASSWORD)
        connection = await oracledb.getConnection({ user: "admin", password: process.env.ORACLE_DB_PASSWORD, connectionString: "GOALSDB_high" });

        // Create a table

        await connection.execute(`begin
                                execute immediate 'drop table nodetab';
                                exception when others then if sqlcode <> -942 then raise; end if;
                              end;`);

        await connection.execute(`create table nodetab (id number, data varchar2(20))`);

        // Insert some rows

        const sql = `INSERT INTO nodetab VALUES (:1, :2)`;

        const binds =
            [[1, "Firste"],
            [2, "Second"],
            [3, "Third"],
            [4, "Fourth"],
            [5, "Fifth"],
            [6, "Sixth"],
            [7, "Seventh"]];

        await connection.executeMany(sql, binds);

        connection.commit();     // uncomment to make data persistent

        // Now query the rows back

        const result = await connection.execute(`SELECT * FROM nodetab`);

        console.dir(result.rows, { depth: null });

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}