const nodemailer = require("nodemailer")

export class EmailSenderService {

   async SendEmail(target: string) {
      console.log("##### SENDING EMAIL... #####");

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
         subject: "Get It Done - Email confirmation", // Subject line
         html: `
         <h3>Hello<h3/>
         <p>Thank you for creating a account. Please confirm your email by clicking on the following link</p>
         `
         //<a href=http://localhost:8081/confirm/${confirmationCode}> Click here <a/>
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
