import express from "express";
import {
	
	loginUser,
	registerUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/validateToken.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

export { router as userRouter };
