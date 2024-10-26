
import { Router } from "express";
import { HealthcheckController } from "../controller/healthcheck.controller.js";

const router = Router();

const healthcheckController = new HealthcheckController()
router.get('/',healthcheckController.healthcheck)

export default router