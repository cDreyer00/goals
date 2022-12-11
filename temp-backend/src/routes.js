import { Router } from "express";
import { loginUserHandler, createUserHandler } from "./handlers/user_handlers.js";
import "./auth.js"
import { authUser, checkAuth } from "./auth.js";

export const router = Router();

/* ----- USER ROUTES ----- */

router.get("/login", loginUserHandler);

router.post("/user", createUserHandler);


/* ----- GOALS ROUTES ----- */

router.post("/goal", checkAuth);
router.put("/goal");
router.delete("/goal");

router.get("/user/goals");


// ----- EMAIL CONFIRMATION -----
router.get("/confirmation/:token", async (req, res) => {

    const { token } = req.params;
    console.log(token);
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
