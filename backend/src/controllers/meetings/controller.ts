import { NextFunction, Request, Response } from "express";
import Meeting from "../../models/Meeting";
import Team from "../../models/Team";
import { Op } from "sequelize";

export async function getMeetingsByTeam(
    req: Request<{teamId: string}>, 
    res: Response, 
    next: NextFunction
) {
    try {
        const meetings = await Meeting.findAll({
            where: {
                teamId: req.params.teamId
            },
            include: [Team],
            order: [['startTime', 'ASC']]
        });
        res.json(meetings);
    } catch (e) {
        next(e);
    }
}

export async function getAvailableRooms(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { startTime, endTime } = req.query;
        
        const allRooms = ['Blue Room', 'New York Room', 'Large Board Room', 'Conference Room A', 'Conference Room B', 'Meeting Room 1', 'Meeting Room 2'];
        
        if (!startTime || !endTime) {
            return res.json(allRooms);
        }
        
        const busyMeetings = await Meeting.findAll({
            where: {
                [Op.or]: [
                    {
                        startTime: {
                            [Op.lte]: startTime
                        },
                        endTime: {
                            [Op.gt]: startTime
                        }
                    },
                    {
                        startTime: {
                            [Op.lt]: endTime
                        },
                        endTime: {
                            [Op.gte]: endTime
                        }
                    },
                    {
                        startTime: {
                            [Op.gte]: startTime
                        },
                        endTime: {
                            [Op.lte]: endTime
                        }
                    }
                ]
            },
            attributes: ['room']
        });
        
        const busyRooms = busyMeetings.map(m => m.room);
        const availableRooms = allRooms.filter(room => !busyRooms.includes(room));
        
        res.json(availableRooms);
    } catch (e) {
        next(e);
    }
}

// BONUS: Overlap validation
export async function createMeeting(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    try {
        const { teamId, startTime, endTime, description, room } = req.body;
        
        const overlappingMeetings = await Meeting.findAll({
            where: {
                teamId: teamId,
                [Op.or]: [
                    {
                        startTime: {
                            [Op.lte]: startTime
                        },
                        endTime: {
                            [Op.gt]: startTime
                        }
                    },
                    {
                        startTime: {
                            [Op.lt]: endTime
                        },
                        endTime: {
                            [Op.gte]: endTime
                        }
                    },
                    {
                        startTime: {
                            [Op.gte]: startTime
                        },
                        endTime: {
                            [Op.lte]: endTime
                        }
                    }
                ]
            }
        });

        if (overlappingMeetings.length > 0) {
            return res.status(409).json({ 
                error: 'Meeting time conflicts with existing meeting for this team',
                conflictingMeetings: overlappingMeetings
            });
        }

        const newMeeting = await Meeting.create(req.body);
        await newMeeting.reload({include: Team});
        res.status(201).json(newMeeting);
    } catch (e) {
        next(e);
    }
}

