import { Router } from "express";
import { loginUserHandler, createUserHandler } from "./handlers/user_handlers.js";
import "./auth.js"
import { checkAuth } from "./auth.js";
import { createGoalHandler, editGoalHandler, deleteGoalHandler, getUserGoalsHandler } from "./handlers/goal_handlers.js";

export const router = Router();

// route for check

router.get("/", (req, res) => res.json({ ok: true }))


/* ----- USER ROUTES ----- */

router.post("/login", loginUserHandler);
router.post("/user", createUserHandler);
router.get("/user/goals", checkAuth, getUserGoalsHandler);

/* ----- GOALS ROUTES ----- */

router.post("/goal/create", checkAuth, createGoalHandler);
router.put("/goal/edit", checkAuth, editGoalHandler);
router.delete("/goal/delete", checkAuth, deleteGoalHandler);



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
