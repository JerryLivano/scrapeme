import { LineChart } from "@mui/x-charts";
import CardList from "../../components/common/DashboardPage/CardList";
import DashboardChart from "../../components/layout/Dashboard/DashboardChart";
import TopUser from "../../components/common/DashboardPage/TopUser";
import UserLandingPage from "../../components/common/DashboardPage/UserLandingPage";
import { extractRole, getAuthToken } from "../../utils/authUtilities";

export default function DashboardPage() {
    const token = getAuthToken();
    const role = extractRole(token);

    return (
        <>
            {!role && <Spinner />}
            {role && (
                <main className='mb-7 flex flex-col gap-10'>
                    {role === "ROLE_ADMIN" ? (
                        <>
                            <CardList />
                            <div className='flex flex-col gap-x-5 -mt-3 sm:flex-row'>
                                <div className='w-1/2'>
                                    <TopUser />
                                </div>
                                <div className='w-full'>
                                    <DashboardChart />
                                </div>
                            </div>
                        </>
                    ) : (
                        <UserLandingPage />
                    )}
                </main>
            )}
        </>
    );
}
