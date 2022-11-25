import { prismaClient } from "../prismaClient";

export interface UserRequest {
   name: string,
   email: string,
   password: string
}

export class UserServices {
   async insertData({ name, email, password }: UserRequest) {

      const new_user = await prismaClient.user.create({
         data: {
            email: email,
            name: name,
            password: password
         }
      })

      return new_user;
   }

   async getData(id: number) {

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