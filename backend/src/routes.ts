import { Router, Request, Response } from "express";
import { prismaClient } from "./prismaClient";
import { verifySession, createSession } from "./Auth/session";
import { UserServices } from "./services/UserServices"
import { GoalServices } from "./services/GoalServices"

export const router = Router();

const userServices = new UserServices();
const goalServices = new GoalServices();

// ----- HOME -----

router.get("/", (req: Request, res: Response) => {
   return res.json("homepage");
})


// ----- USER -----

// loggin
router.get("/login", async (req: Request, res: Response) => {

   const { email, password } = req.body;
   if (!email || !password) {
      return res.json("need fill all fields")
   }

   const user = await userServices.authData(email, password)
   if (!user) {
      return res.json("incorrect email or password");
   }

   createSession(user.id, res);

   return res.json(user);
})

// get user info
router.get("/user/infos", verifySession, async (req: Request, res: Response) => {

   const id: number = +req.cookies.id;
   const user = await userServices.getData(id);
   if (!user) {
      return res.json("account not found")
   }

   return res.json(user);
})

// get all users infos
router.get("/users", async (req: Request, res: Response) => {
   const all_users = await prismaClient.user.findMany();
   return res.json(all_users);
})

// create user
router.post("/user", async (req: Request, res: Response) => {

   const { name, password, email } = req.body;
   const new_user = await userServices.insertData({ name, password, email })

   return res.json(new_user);
})

// ----- GOAL -----

// create goal
router.post("/goal", verifySession, async (req: Request, res: Response) => {

   const { title, description, value, achievement_time } = req.body;
   const user_id: number = +req.cookies.id

   if (user_id === undefined || title == "" || description == "") return res.json("fill al main fields")

   const { year, month, day } = achievement_time;
   const date = new Date(year, month, day);

   const new_goal = await goalServices.insertData({ title, description, value, achievement_time: date, user_id })


   return res.json(new_goal);
})

// get user goals
router.get("/goals", verifySession, async (req: Request, res: Response) => {
   const user_id: number = +req.cookies.id;
   const all_goals = await goalServices.getGoals(user_id)

   return res.json(all_goals);
})