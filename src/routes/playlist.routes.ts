import { Router } from "express";
import { PlaylistController } from "../controller/playlist.controller.js";
import { PlaylistService } from "../services/playlist.services.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import logger from "../utils/logger.js";


const router = Router();
router.use(verifyJWT)

const playlistService = new PlaylistService()
const playlistController = new PlaylistController(playlistService,logger)

router.post("/create-playlist", playlistController.createPlaylist);
// id-> userId
router.get("/user-playlist/:id", playlistController.           getUserPlaylists);

export default router