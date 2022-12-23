import sqlite3 from "sqlite3";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);


const db = new sqlite3.Database(`${__dirname}/db/test.db`);
db.serialize(() => {
    db.run("CREATE TABLE users(id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)");

    const stmt = db.prepare("INSERT INTO users(name) VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT * FROM users", (err, row) => {
        console.log(row.id + ": " + row.name);
    });
});

db.close()

// VIDEO LINK TO CONTINUE AFTER: https://www.youtube.com/watch?v=ZRYn6tgnEgM&ab_channel=CodingWithMike