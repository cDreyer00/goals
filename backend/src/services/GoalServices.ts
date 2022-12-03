import { prisma } from "@prisma/client";
import { prismaClient } from "../prismaClient"

interface GoalRequest {
    id?: number,
    title?: string,
    description?: string,
    value?: number,
    achievement_time?: Date,
    completed?: boolean,
    user_id?: number
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

    async getGoals({ user_id }: GoalRequest) {

        try {
            const goals = await prismaClient.goal.findMany({
                where: {
                    user_id: user_id
                }
            })
            return goals;
        }
        catch (err) {
            console.log(err)
            return "No goals found"
        }
    }

    async checkGoal({ id, completed }: GoalRequest) {
        try {
            return await prismaClient.goal.update({
                where: {
                    id: id
                },
                data: {
                    completed: completed
                }
            })
        } catch (err) {
            return err
        }
    }

    async updateData({ id, title, description, value, achievement_time, completed, user_id }: GoalRequest) {
        try {
            console.log(id)
            return await prismaClient.goal.update({
                where: {
                    id: id
                },
                data: {                    
                    title: title,
                    description: description,
                    value: value,
                    achievement_time: achievement_time,
                    completed: completed
                }
            })
        } catch (err) {
            console.log(err)
            throw new Error(err)
        }
    }
}