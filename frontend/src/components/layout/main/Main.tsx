import { Navigate, Route, Routes } from "react-router-dom";
import MeetingsMain from "../../meetings/main/MeetingsMain";
import NotFound from "../not-found/NotFound";

export default function Main() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/meetings" />} />
            <Route path="/meetings" element={<MeetingsMain />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
