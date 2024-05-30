import { useNavigate } from "react-router-dom";
import ButtonPlus from "../../components/elements/Button/ButtonPlus";
import { useState } from "react";

export default function TabApplication({
    dataApplications,
    selectedApplication,
    setSelectedApplication,
    isManageApp,
    setIsManageApp,
}) {
    return (
        <>
            <div className='mt-8 mb-10'>
                <div className='flex items-start font-semibold text-lg pt-2'>
                    Application
                </div>
                <div className='flex py-2 items-end justify-between'>
                    <div className='flex items-start h-full w-full'>
                        {dataApplications.map((app) => (
                            <div className='pt-1'>
                                <button
                                    key={app.id}
                                    className={`text-gray-400 inline-flex text-lg whitespace-nowrap py-3 px-4 h-fit border-b-2 ${
                                        isManageApp &&
                                        selectedApplication &&
                                        selectedApplication.id === app.id
                                            ? "border-b-indigo-600 text-indigo-600"
                                            : "border-gray-300 hover:border-indigo-600 hover:text-indigo-600"
                                    }`}
                                    onClick={() => {
                                        setIsManageApp(true);
                                        setSelectedApplication(app);
                                    }}
                                >
                                    {app.name}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='border-b-2 border-gray-300 w-full '></div>
                    <div className='h-full border-b-2 border-gray-300 pl-3 pb-3'>
                        {isManageApp && (
                            <ButtonPlus
                                title={"Application"}
                                onClick={() => {
                                    setIsManageApp(false);
                                    setSelectedApplication({});
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
