import sqlite3 from "sqlite3";
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new sqlite3.Database(`${__dirname}/.db`, (err) => {
    if (err) return console.error(err.message);

    console.log("connected to database");
});


// CREATE MAIN TABLES

function createUsersTable() {
    const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`;

    db.run(createUsersTable);
}

function createGoalsTable() {
    const createGoalsTable = `
    CREATE TABLE IF NOT EXISTS goals (
      id INTEGER PRIMARY KEY,
      title TEXT,
      description TEXT,
      due_date DATE,
      value NUMERIC,
      current_value NUMERIC,
      edit INTEGER,
      status TEXT NOT NULL,
      user_id NUMERIC,
      CHECK (status IN ('Done', 'Pending', 'Failed'))
      )
  `;
    db.run(createGoalsTable);
}

createUsersTable();
createGoalsTable();

export default db;