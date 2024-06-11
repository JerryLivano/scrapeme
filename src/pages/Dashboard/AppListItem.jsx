import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetPermissionApplicationQuery } from "../../services/applicationApiSlice";
import Spinner from "../../components/elements/Spinner/Spinner";

const AppListItem = () => {
    const {
        data: applications,
        isSuccess,
        isLoading,
        isError,
    } = useGetPermissionApplicationQuery();
    console.log(applications);

    return (
        <>
            {isLoading && <Spinner />}
            {isError && (
                <div className='justify-center text-xl font-semibold'>
                    Error Fetching Application
                </div>
            )}
            {isSuccess && (
                <div className='flex justify-center'>
                    <div className='flex flex-wrap justify-center gap-6 max-w-4xl'>
                        {applications.data.map(
                            (app) =>
                                app.isActive && (
                                    <Link
                                        to={app.url}
                                        className='hover:opacity-90'
                                        title={app.name}
                                        key={app.id}
                                    >
                                        <div className='flex flex-col divide-y divide-gray-200 rounded-2xl h-48 w-48 bg-slate-200 hover:bg-slate-400 text-center shadow'>
                                            <div className='flex flex-col justify-between items-center p-4'>
                                                <div className="h-30 mb-2">
                                                    <img
                                                        className="h-[130px]"
                                                        src={app.image}
                                                    />
                                                </div>
                                                <div className='text-blue-800 font-semibold'>
                                                    {app.name}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default AppListItem;
