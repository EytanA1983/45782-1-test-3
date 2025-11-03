import { NextFunction, Request, Response } from "express";
import Region from "../../models/Region";
import HikingSite from "../../models/HikingSite";

// Get all regions
export async function getAllRegions(req: Request, res: Response, next: NextFunction) {
    try {
        const regions = await Region.findAll({
            order: [['name', 'ASC']]
        });
        res.json(regions);
    } catch (e) {
        next(e);
    }
}

