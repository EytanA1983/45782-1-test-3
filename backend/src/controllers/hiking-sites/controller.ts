import { NextFunction, Request, Response } from "express";
import HikingSite from "../../models/HikingSite";
import Region from "../../models/Region";

// Get hiking sites by region
export async function getHikingSitesByRegion(
    req: Request<{regionId: string}>, 
    res: Response, 
    next: NextFunction
) {
    try {
        const hikingSites = await HikingSite.findAll({
            where: {
                regionId: req.params.regionId
            },
            include: [Region],
            order: [['name', 'ASC']]
        });
        res.json(hikingSites);
    } catch (e) {
        next(e);
    }
}

// Create a new hiking site
export async function createHikingSite(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    try {
        const newSite = await HikingSite.create(req.body);
        await newSite.reload({include: Region});
        res.status(201).json(newSite);
    } catch (e) {
        next(e);
    }
}

// Delete an existing hiking site
export async function deleteHikingSite(
    req: Request<{id: string}>, 
    res: Response, 
    next: NextFunction
) {
    try {
        const deleted = await HikingSite.destroy({
            where: {
                id: req.params.id
            }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Hiking site not found' });
        }
    } catch (e) {
        next(e);
    }
}

