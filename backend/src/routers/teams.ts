import { Router } from "express";
import { getAllTeams } from "../controllers/teams/controller";

const router = Router();

// GET /teams - Get list of development teams
router.get('/', getAllTeams);

export default router;

