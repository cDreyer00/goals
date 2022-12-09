import { prisma } from "@prisma/client";
import { prismaClient } from "../prismaClient"

export class GoalServices {

    async insertGoal({ title, description, value, achievement_time, user_id }) {
        console.log(title);
        title = title == null ? "" : title;
        description = description == null ? "" : description;
        value = value == null ? "" : value;

        try {
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
        } catch (err) {
            console.log(err)
            throw new Error(err)
        }

    }

    async deleteGoal({ id }) {
        try {
            await prismaClient.goal.delete({
                where: {
                    id: id
                }
            })
            return { deleted: true }
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGoals({ user_id }) {

        try {
            const goals = await prismaClient.goal.findMany({
                where: {
                    user_id: user_id
                }
            })
            console.log(user_id);
            console.log(goals);
            return goals;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    async checkGoal({ id, completed }) {
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

    async updateGoal({ id, title, description, value, achievement_time, completed, user_id }) {
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
            throw new Error(err)
        }
    }
}