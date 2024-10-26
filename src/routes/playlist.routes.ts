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
router.get("/user-playlist/:id", playlistController.getUserPlaylists);
// id -> playlistId
router.get("/playlist/:id", playlistController.getPlaylistById);

router.post("/playlist/:playlistId/:videoId", playlistController.addVideoToPlaylist);

router.patch("/playlist/:playlistId/:videoId", playlistController.removeVideoFromPlaylist);
router.delete("/playlist-delete/:playlistId", playlistController.deletePlaylist);

router.patch("/playlist-update/:playlistId", playlistController.updatePlaylist);

export default router