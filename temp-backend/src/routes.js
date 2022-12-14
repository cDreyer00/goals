import { Router } from "express";
import { loginUserHandler, createUserHandler } from "./handlers/user_handlers.js";
import "./auth.js"
import { checkAuth } from "./auth.js";
import { createGoalHandler, getUserGoalsHandler } from "./handlers/goal_handlers.js";

export const router = Router();

/* ----- USER ROUTES ----- */

router.get("/login", loginUserHandler);

router.post("/user", createUserHandler);


/* ----- GOALS ROUTES ----- */

router.get("/user/goals", checkAuth, getUserGoalsHandler);
router.post("/goal", checkAuth, createGoalHandler);
router.put("/goal");
router.delete("/goal");



// ----- EMAIL CONFIRMATION -----
router.get("/confirmation/:token", async (req, res) => {

    const { token } = req.params;

    try {
        const { sub } = verify(token, process.env.JWT_HASH)

        await prismaClient.user.update({
            where: {
                email: sub
            },
            data: {
                account_verified: true
            }
        })
        return res.json();

    } catch (err) {
        return res.status(400).json("invalid token");
    }
})
