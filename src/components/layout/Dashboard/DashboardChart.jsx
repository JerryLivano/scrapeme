import { PieChart } from "@mui/x-charts";
import { useGetChartQuery } from "../../../services/dashboard/dashboardApiSlice";
import Spinner from "../../common/Public/Spinner";

export default function DashboardChart() {
    const { data: chart, isLoading, isError, isSuccess } = useGetChartQuery();

    return (
        <div className='bg-white shadow rounded-lg py-6 pe-8'>
            <div className='text-2xl flex justify-end font-semibold text-gray-800'>
                Site Scraped Count Chart
            </div>
            {isLoading && (
                <div className='mt-28 mb-16'>
                    <Spinner />
                </div>
            )}
            {isError && (
                <div className='flex justify-center items-center text-center text-2xl font-semibold mt-28 mb-16'>
                    Failed to Fetch Chart
                </div>
            )}
            {isSuccess && (
                <PieChart
                    series={[
                        {
                            data: chart.data,
                        },
                    ]}
                    width={600}
                    height={300}
                />
            )}
        </div>
    );
}
