import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../../store/Store";
import { DashboardStats } from "./Dashboard.Stats";

export const DashboardContent = () => {
    const user = useSelector((state: AppState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.user) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            <DashboardStats />
        </>
    );
};
