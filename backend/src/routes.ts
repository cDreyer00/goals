import { Router, Request, Response } from "express";
import { prismaClient } from "./prismaClient";
import { verifySession, createSession } from "./Auth/session";
import { UserServices } from "./services/UserServices"
import { GoalServices } from "./services/GoalServices"
import { resourceUsage, send } from "process";
import { validate } from "deep-email-validator"

const nodemailer = require("nodemailer")


export const router = Router();

const userServices = new UserServices();
const goalServices = new GoalServices();

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
   if (!name || !email || !password) {
      return res.status(400).send("Need fill all fields");
   }
   const sendEmail = await SendMail(email);

   if(!sendEmail){
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


// SENDMAIL

async function SendMail(target: string) {
   console.log("##### SENDING EMAIL... #####");

   const validator = await ValidateEmail(target);

   if(!validator){
      return false;
   }

   const email = process.env.EMAIL;
   const pass = process.env.PASS;

   let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
         user: email, // generated ethereal user
         pass: pass, // generated ethereal password
      },
   });

   let info = {
      from: email, // sender address
      to: target, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
   };

   await transporter.sendMail(info, (error: any, info: any) => {
      if (error) {
         console.log("error ocurred");
         console.log(error)
         console.log(error.message)
         return false;
      }
      console.log("Message sent successfully")
   })

   return true;
}

async function ValidateEmail(target: string) {
   const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
   const isValid = emailRegex.test(target);
   return isValid;
}