// import "dotenv/config"
// import axios from "axios";




// // export async function get(sql) {
// //     const result = await axios({
// //         method: 'get',
// //         url: 'https://goalsbackend.glitch.me/db',
// //         params: {
// //             sql: sql
// //         }
// //     }).then((res) => {
// //         console.log(res.data);
// //     }).catch((err => {
// //         console.log(err);
// //     }))

// //     console.log("result: ");
// //     console.log(result);
// // }

// // export function post(sql) {
// //     return new promise
// //     await axios({
// //         method: 'post',
// //         url: 'https://goalsbackend.glitch.me/db',
// //         params: {
// //             sql: sql
// //         }
// //     }).then((res) => {
// //         return res.data;
// //     }).catch((err) => {
// //         throw err
// //     })
// // }

// console.log(post("sql test"))

// // CREATE MAIN TABLES

// async function createUsersTable() {
//     console.log("creating");
//     const createUsersTable = `
//       CREATE TABLE users (
//           id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
//           name VARCHAR2(255) NOT NULL,
//           email VARCHAR2(255) NOT NULL,
//           password VARCHAR2(255) NOT NULL
//           )`;

//     await connection().then(db => db.execute(createUsersTable));
// }

// async function createGoalsTable() {
//     const createGoalsTable = `
//         CREATE TABLE goals (
//           id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
//           title VARCHAR2(255),
//           description VARCHAR2(255),
//           due_date DATE,
//           value NUMBER,
//           current_value NUMBER,
//           edit NUMBER,
//           status VARCHAR2(255) NOT NULL,
//           user_id NUMBER,
//           CHECK (status IN ('Done', 'Pending', 'Failed'))
//         )`;

//     await connection().then(db => db.execute(createGoalsTable));
// }


// // createUsersTable();
// // createGoalsTable();
