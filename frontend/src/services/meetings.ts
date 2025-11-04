import axios from "axios";
import { Meeting } from "../models/Meeting";
import { MeetingDraft } from "../models/MeetingDraft";

class MeetingsService {
    async getByTeamId(teamId: number): Promise<Meeting[]> {
        const { data } = await axios.get<Meeting[]>(`${import.meta.env.VITE_REST_SERVER_URL}/meetings/by-team/${teamId}`);
        return data;
    }

    async create(draft: MeetingDraft): Promise<Meeting> {
        const { data } = await axios.post<Meeting>(`${import.meta.env.VITE_REST_SERVER_URL}/meetings`, draft);
        return data;
    }

    async getAvailableRooms(startTime?: string, endTime?: string): Promise<string[]> {
        const params = new URLSearchParams();
        if (startTime) params.append('startTime', startTime);
        if (endTime) params.append('endTime', endTime);
        
        const { data } = await axios.get<string[]>(
            `${import.meta.env.VITE_REST_SERVER_URL}/meetings/available-rooms?${params.toString()}`
        );
        return data;
    }
}

export default new MeetingsService();

