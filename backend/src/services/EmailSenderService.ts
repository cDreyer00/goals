import { sign } from "jsonwebtoken"
const nodemailer = require("nodemailer")

export class EmailSenderService {

   async SendEmail(target: string) {
      console.log("##### SENDING EMAIL... #####");

      const env_email = process.env.EMAIL;
      const env_pass = process.env.PASS;

      let transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: env_email,
            pass: env_pass
         },
      });

      const token = sign(
         {
            email: target
         },
         process.env.JWT_HASH,
         {
            subject: target,
            expiresIn: "1d"
         }
      )

      let info = {
         from: env_email, // sender address
         to: "cristianpereiradreyer@hotmail.com, cristianbr.dreyer@gmail.com", // list of receivers
         subject: "Get It Done - Email confirmation", // Subject line
         html: `
         <h3>Hello<h3/>
         <p>Thank you for creating an account. Please confirm your email by clicking on the following link</p>
         <a href=http://localhost:3333/confirmation/${token}> Click here <a/>
         `
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

   async ValidateEmail(target: string) {
      const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
      const isValid = emailRegex.test(target);
      return isValid;
   }


}
