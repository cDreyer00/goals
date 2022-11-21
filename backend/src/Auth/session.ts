import { NextFunction, Request, Response } from "express";

export function verifySession(req: Request, res: Response, next: NextFunction) {

   const cookie = req.cookies.id

   if (!cookie) {
      console.log("no session found")
      return res.redirect("/");
   }

   console.log("session found");
   return next();
}

export function createSession(id: number, res: Response){
   res.cookie("id", id, {maxAge: 900000})
   console.log("session created");
}