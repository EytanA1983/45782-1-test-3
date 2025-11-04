import Joi from "joi";

// Validation for team parameter
export const meetingsByTeamValidator = Joi.object({
    teamId: Joi.number().integer().positive().required()
});

// Validation for creating a new meeting
export const createMeetingValidator = Joi.object({
    teamId: Joi.number().integer().positive().required(),
    startTime: Joi.date().iso().required(),
    endTime: Joi.date().iso().min(Joi.ref('startTime')).required(),
    description: Joi.string().min(10).required(),
    room: Joi.string().min(2).max(255).required()
});

