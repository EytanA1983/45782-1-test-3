import axios from "axios";
import { Region } from "../models/Region";

class RegionsService {
    async getAll(): Promise<Region[]> {
        const { data } = await axios.get<Region[]>(`${import.meta.env.VITE_REST_SERVER_URL}/regions`);
        return data;
    }
}

export default new RegionsService();

