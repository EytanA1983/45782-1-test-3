import { NextFunction, Request, Response } from "express";
import Team from "../../models/Team";

// Get all development teams
export async function getAllTeams(req: Request, res: Response, next: NextFunction) {
    try {
        const teams = await Team.findAll({
            order: [['name', 'ASC']]
        });
        res.json(teams);
    } catch (e) {
        next(e);
    }
}

