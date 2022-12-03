import { prismaClient } from "../prismaClient";

export interface UserRequest {
   name: string,
   email: string,
   password: string
}

export class UserServices {
   async insertOrUpdateData({ name, email, password }: UserRequest) {
      const alreadyExists = await prismaClient.user.findUnique({
         where: {
            email: email
         }
      })

      if (alreadyExists) {
         const new_user = await prismaClient.user.update({
            where: {
               email: email
            },
            data: {
               email: email,
               name: name,
               password: password
            }
         })

         return new_user;
      }

      const new_user = await prismaClient.user.create({
         data: {
            email: email,
            name: name,
            password: password
         }
      })

      return new_user;
   }

   async getData(id: string) {

      const user = await prismaClient.user.findUnique({
         where: {
            id: id
         }
      })

      return user;
   }

   async authData(email: string, password: string) {

      const user = await prismaClient.user.findFirst({
         where: {
            email: email,
            password: password
         }
      })

      return user;
   }
}