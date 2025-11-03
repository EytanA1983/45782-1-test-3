import { HikingSiteDraft } from "./HikingSiteDraft";
import { Region } from "./Region";

export interface HikingSite extends HikingSiteDraft {
    id: number;
    createdAt: string;
    updatedAt: string;
    region?: Region;
}

