import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { DashboardController } from "../controller/dashboard.controller.js";
import { DashboardService } from "../services/dashboard.services.js";

const router = Router();
router.use(verifyJWT);
const dashboardService = new DashboardService();

const dashboardController = new DashboardController(dashboardService);
router.get("/dashboard-stats",dashboardController.getChannelStats)
router.get("/dashboard-video",dashboardController.getChannelVideos)


export default router;