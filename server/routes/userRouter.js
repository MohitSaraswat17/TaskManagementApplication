import express from "express";
import {login,logout,myProfile,register} from "../controllers/userController.js"

const router = express.Router();

import {isAuthenticated} from "../middlewares/auth.js"

router.post("/login",login);

router.get("/logout",isAuthenticated,logout);
router.get("/me",isAuthenticated,myProfile);
router.post("/register",register);


export default router;