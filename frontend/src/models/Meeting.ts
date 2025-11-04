import { MeetingDraft } from "./MeetingDraft";
import { Team } from "./Team";

export interface Meeting extends MeetingDraft {
    id: number;
    createdAt: string;
    updatedAt: string;
    team?: Team;
}

