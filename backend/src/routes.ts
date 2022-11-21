import { Router, Request, Response } from "express";
import { prismaClient } from "./prismaClient";
import { verifySession, createSession } from "./Auth/session";
import { UserServices } from "./services/UserServices"

export const router = Router();

const userService = new UserServices();

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

   const user = await userService.authData(email, password)
   if (!user) {
      return res.json("incorrect email or password");
   }

   createSession(user.id, res);

   return res.json(user);
})

// get user info
router.get("/user/infos", verifySession, async (req: Request, res: Response) => {

   const id: number = +req.cookies.id;
   const user = await userService.getData(id);
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
   const new_user = await userService.insertData({ name, password, email })

   return res.json(new_user);
})


// ----- GOAL -----

// create goal
router.post("/goal", async (req: Request, res: Response) => {
   const { title, description, value, achievement_time, user_id } = req.body;

   const { year, month, day } = achievement_time;
   const date = new Date(year, month, day);

   if (user_id === undefined || title == "" || description == "") return res.json("fill al main fields")

   const new_goal = await prismaClient.goal.create({
      data: {
         title: title,
         description: description,
         value: value,
         achievement_time: date,
         user_id: user_id
      }
   })

   return res.json(new_goal);
})