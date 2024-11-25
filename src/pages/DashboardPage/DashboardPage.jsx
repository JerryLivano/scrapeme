import { LineChart } from "@mui/x-charts";
import CardList from "../../components/common/DashboardPage/CardList";
import DashboardChart from "../../components/layout/Dashboard/DashboardChart";
import TopUser from "../../components/common/DashboardPage/TopUser";

export default function DashboardPage() {
    return (
        <main className='mb-7 flex flex-col gap-10'>
            <CardList />
            <div className='flex flex-col gap-x-5 -mt-3 sm:flex-row'>
                <div className='w-1/2'>
                    <TopUser />
                </div>
                <div className='w-full'>
                    <DashboardChart />
                </div>
            </div>
        </main>
    );
}
