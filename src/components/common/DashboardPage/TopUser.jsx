import { useId } from "react";
import TopUserList from "../Public/TopUserList";

export default function TopUser() {
    const topUsers = [
        {
            name: "Jerry Lipano",
            email: "2172002@gmail.com",
            count: 12,
        },
        {
            name: "Jerry Lipano",
            email: "2172002@gmail.com",
            count: 12,
        },
        {
            name: "Jerry Lipano",
            email: "2172002@gmail.com",
            count: 12,
        },
        {
            name: "Jerry Lipano",
            email: "2172002@gmail.com",
            count: 12,
        },
        {
            name: "Jerry Lipano",
            email: "2172002@gmail.com",
            count: 12,
        },
    ];

    return (
        <>
            <div className='mb-4 text-xl font-medium text-gray-800'>
                Top Scraper Count
            </div>
            {topUsers.length === 0 ? (
                <div className='rounded-lg shadow bg-white w-full px-4 py-5 text-center text-lg font-semibold text-gray-800'>
                    No Data Found
                </div>
            ) : (
                <div className='flex flex-col gap-y-3'>
                    {topUsers.map((data) => {
                        return (
                            <TopUserList
                                key={useId()}
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
