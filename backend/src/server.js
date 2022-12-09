import express, { Request, Response } from "express"
import { router } from "./routes"
import cookieParser from "cookie-parser";

const app = express();
const port = 3333;

app.use(express.json())

app.use(cookieParser());

app.use(router)

app.listen(port, () => console.log(`SERVER RUNNING: http://localhost:${port}`));

export default app;