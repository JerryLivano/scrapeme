import { Children } from "react";
import Dashboardlayout from "../../components/layouts/DashboardLayout";
import ErrorPage from "../404";

const Dashboard = ({ children }) => {
    return (
        <div>
            <DashboardLayout>
                <h1>
                    <b>This is Dashboard Page</b>
                </h1>
            </DashboardLayout>
        </div>
    );
};

export default Dashboard;
