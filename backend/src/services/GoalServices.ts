import { prismaClient } from "../prismaClient"

interface GoalRequest {
   title: string,
   description: string,
   value: number,
   achievement_time: Date,
   user_id: number
}


export class GoalServices {

   async insertData({ title, description, value, achievement_time, user_id }: GoalRequest) {

      const new_goal = await prismaClient.goal.create({
         data: {
            title: title,
            description: description,
            value: value,
            achievement_time: achievement_time,
            user_id: user_id
         }
      })

      return new_goal;
   }

   async getGoals(user_id: number){
      const goals = await prismaClient.goal.findMany({
         where:{
            user_id: user_id
         }
      })

      return goals;
   }
}