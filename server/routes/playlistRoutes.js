import express from "express";
import {
	createPlaylist,
	getPlaylist,
	getPlaylists,
} from "../controllers/playlistController.js";
import { verifyToken } from "../middleware/validateToken.js";

const router = express.Router();

router.get("/", getPlaylists);
router.post("/create", verifyToken, createPlaylist);
router.get("/:id", getPlaylist);


export { router as playlistRouter };
