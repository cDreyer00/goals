import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { prismaClient } from "../prismaClient";

export default class Auth {

   async verifySession(req: Request, res: Response, next: NextFunction) {

      const authToken = await req.cookies.token;
      if (!authToken) {
         Auth.user = "";
         return res.redirect("/");
      }

      try {
         const email = verify(authToken, process.env.JWT_HASH).sub as string;

         const user = await prismaClient.user.findFirst({
            where: {
               email: email
            }
         })
         
         Auth.user = user

         return next();

      } catch (err) {
         console.log("ERROR " + err)
         Auth.user = null;
         
         return res.status(404).send("Invalid token");
      }
   }
   
   static user;
}