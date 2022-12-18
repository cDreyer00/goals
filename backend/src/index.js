import express from "express"
import { router } from "./routes.js";
import bodyParser from "body-parser";
import "dotenv/config"
import cookieParser from "cookie-parser";

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


app.use(router);

app.listen(process.env.PORT, () => console.log(`SERVER RUNNING ON http://localhost:${process.env.PORT}`))



//import { execute, usersTable, goalsTable, createUsersTable, createGoalsTable } from './database.js'
//console.log(await execute(`select * from ${goalsTable}`));