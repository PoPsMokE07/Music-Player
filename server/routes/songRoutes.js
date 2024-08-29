import express from "express";
import {
	getSongs,
} from "../controllers/songController.js";
import { verifyToken } from "../middleware/validateToken.js";

const router = express.Router();

router.get("/", getSongs);


export { router as songsRouter };
