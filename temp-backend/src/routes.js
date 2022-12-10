import { Router } from "express";
import {loginUserHandler} from "./handlers/user_handlers.js";

export const router = Router();

router.get("/login", loginUserHandler)