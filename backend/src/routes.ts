import { Router, Request, Response } from "express";
import { prismaClient } from "./prismaClient";
import Auth from "./Auth/session";
import { UserServices } from "./services/UserServices"
import { GoalServices } from "./services/GoalServices"
import { EmailSenderService } from "./services/EmailSenderService";
import { sign } from "jsonwebtoken";

export const router = Router();

const userServices = new UserServices();
const goalServices = new GoalServices();
const emailSender = new EmailSenderService();
const auth = new Auth();

// ----- HOME -----

router.get("/", (req: Request, res: Response) => {
   return res.json("homepage");
})


// ----- USER -----

// loggin
router.post("/login", async (req: Request, res: Response) => {

   const { email, password } = req.body;


   if (!email || !password) {
      return res.status(400).json("need fill all fields")
   }

   const user = await userServices.authData(email, password)
   if (!user) {
      return res.status(400).json("incorrect email or password");
   }

   const token = sign(
      {
         email: user.email
      },
      process.env.JWT_HASH,
      {
         subject: user.email,
         expiresIn: "30d"
      }
   )

   res.cookie("token", token, { maxAge: 90000000 });
   console.log(req.cookies.token)
   return res.json(token);
})

// get user info
router.get("/user/infos", auth.verifySession, async (req: Request, res: Response) => {
   const email = Auth.email;
   
   console.log("EMAIL: " + email);
   
   const user = await prismaClient.user.findUnique({
      where: {
         email: email
      }
   });

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
   if (!name || !email || !password) {
      return res.status(400).send("Need fill all fields");
   }
   const validator = await emailSender.ValidateEmail(email);

   if (!validator) {
      return res.status(400).send("Invalid email")
   }

   const sendEmail = await emailSender.SendEmail(email);

   if (!sendEmail) {
      return res.status(400).send("Invalid email")
   }

   try {
      const new_user = await userServices.insertData({ name, password, email })
      return res.json(new_user);

   } catch (err) {
      return res.status(400).json("Email already exists");
   }

})

// ----- GOAL -----

// create goal
router.post("/goal", auth.verifySession, async (req: Request, res: Response) => {

   const { title, description, value, achievement_time } = req.body;
   const user_id: number = +req.cookies.id

   if (user_id === undefined || title == "" || description == "") return res.json("fill al main fields")

   const { year, month, day } = achievement_time;
   const date = new Date(year, month, day);

   const new_goal = await goalServices.insertData({ title, description, value, achievement_time: date, user_id })

   return res.json(new_goal);
})

// get user goals
router.get("/goals", auth.verifySession, async (req: Request, res: Response) => {
   const user_id: number = +req.cookies.id;
   const all_goals = await goalServices.getGoals(user_id)

   return res.json(all_goals);
})