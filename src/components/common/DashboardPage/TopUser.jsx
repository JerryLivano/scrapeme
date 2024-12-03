import { useId } from "react";
import TopUserList from "../Public/TopUserList";
import { useGetTopScraperQuery } from "../../../services/dashboard/dashboardApiSlice";
import Spinner from "../Public/Spinner";

export default function TopUser() {
    const {
        data: topScraper,
        isLoading,
        isError,
        isSuccess,
    } = useGetTopScraperQuery();

    return (
        <>
            <div className='mb-4 text-xl font-medium text-gray-800'>
                Top Scraper Count
            </div>
            {isLoading && <Spinner />}
            {isError && (
                <div className='rounded-lg shadow bg-white w-full px-4 py-5 text-center text-lg font-semibold text-gray-800'>
                    No Data Found
                </div>
            )}
            {isSuccess && (
                <div className='flex flex-col gap-y-3'>
                    {topScraper.data.map((data) => {
                        return (
                            <TopUserList
                                key={data.email}
                                name={data.name}
                                email={data.email}
                                dataCount={data.count}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}
