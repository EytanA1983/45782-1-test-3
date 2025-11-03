import axios from "axios";
import { HikingSite } from "../models/HikingSite";
import { HikingSiteDraft } from "../models/HikingSiteDraft";

class HikingSitesService {
    async getByRegionId(regionId: number): Promise<HikingSite[]> {
        const { data } = await axios.get<HikingSite[]>(
            `${import.meta.env.VITE_REST_SERVER_URL}/hiking-sites/by-region/${regionId}`
        );
        return data;
    }

    async create(draft: HikingSiteDraft): Promise<HikingSite> {
        const { data } = await axios.post<HikingSite>(
            `${import.meta.env.VITE_REST_SERVER_URL}/hiking-sites`, 
            draft
        );
        return data;
    }

    async delete(id: number): Promise<void> {
        await axios.delete(
            `${import.meta.env.VITE_REST_SERVER_URL}/hiking-sites/${id}`
        );
    }
}

export default new HikingSitesService();

