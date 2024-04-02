import { Outlet } from "react-router-dom";
import Dashboardlayout from "../../components/layouts/DashboardLayout";

const LayoutDashboard = () => {
    return (
        <Dashboardlayout>
            <Outlet />
        </Dashboardlayout>
    );
};

export default LayoutDashboard;
