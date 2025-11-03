import { Navigate, Route, Routes } from "react-router-dom";
import HikingSitesMain from "../../hiking-sites/main/HikingSitesMain";
import NotFound from "../not-found/NotFound";

export default function Main() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/hiking-sites" />} />
            <Route path="/hiking-sites" element={<HikingSitesMain />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
