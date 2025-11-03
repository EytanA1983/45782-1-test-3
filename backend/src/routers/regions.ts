import { Router } from "express";
import { getAllRegions } from "../controllers/regions/controller";

const router = Router();

// GET /regions - Get list of regions
router.get('/', getAllRegions);

export default router;

