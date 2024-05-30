import { useNavigate } from "react-router-dom";
import ButtonPlus from "../../components/elements/Button/ButtonPlus";
import { useState } from "react";

export default function TabApplication({
    dataApplications,
    selectedApplication,
    setSelectedApplication
}) {
    const navigate = useNavigate();

    const editApplication = (app) => {
        if (location.pathname === '/application/add-application') {
            navigate('/application');
        }
        setSelectedApplication(app);
    }

    return (
        <>
            <div className='mt-8 mb-10'>
                <div className='flex items-start font-semibold text-lg pt-2'>
                    Application
                </div>
                <div className='flex border-b-2 py-2 border-gray-300 items-center justify-between'>
                    <div className='flex items-start gap-x-6'>
                        {dataApplications.map((app) => (
                            <button
                                key={app.id}
                                className={`text-gray-400 inline-flex text-lg py-3 -mb-2 px-1 h-fit border-b-2 ${
                                    selectedApplication && selectedApplication.id === app.id
                                        ? "border-b-indigo-600 text-indigo-600"
                                        : "border-transparent hover:border-indigo-600 hover:text-indigo-600"
                                }`}
                                onClick={() => editApplication(app)}
                            >
                                {app.name}
                            </button>
                        ))}
                    </div>
                    {location.pathname !==
                        "/application/add-application" && (
                        <div className='flex items-end'>
                            <ButtonPlus
                                title={"Application"}
                                onClick={() => navigate('add-application')}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
