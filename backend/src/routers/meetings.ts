import { Router } from "express";
import { createMeeting, getMeetingsByTeam, getAvailableRooms } from "../controllers/meetings/controller";
import { createMeetingValidator, meetingsByTeamValidator } from "../controllers/meetings/validator";
import paramValidation from "../middlewares/param-validation";
import validation from "../middlewares/validation";

const router = Router();

router.get('/by-team/:teamId', 
    paramValidation(meetingsByTeamValidator), 
    getMeetingsByTeam
);

router.get('/available-rooms', getAvailableRooms);

router.post('/', 
    validation(createMeetingValidator), 
    createMeeting
);

export default router;

