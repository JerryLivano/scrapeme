import { useNavigate } from "react-router-dom";
import ButtonPlus from "../../components/elements/Button/ButtonPlus";
import { useState } from "react";

export default function TabApplication({
    dataApplications,
    selectedApplication,
    setSelectedApplication,
}) {
    const navigate = useNavigate();

    const editApplication = (app) => {
        if (location.pathname === "/application/add-application") {
            navigate(-1, { state: { setSelectedApplication: app } });
        }
        setSelectedApplication(app);
    };

    return (
        <>
            <div className='mt-8 mb-10'>
                <div className='flex items-start font-semibold text-lg pt-2'>
                    Application
                </div>
                <div className='flex py-2 items-end justify-between'>
                    <div className='flex items-start h-full w-full'>
                        {dataApplications.map((app) => (
                            <div className="pt-1">
                                <button
                                    key={app.id}
                                    className={`text-gray-400 inline-flex text-lg whitespace-nowrap py-3 px-4 h-fit border-b-2 ${
                                        selectedApplication &&
                                        selectedApplication.id === app.id
                                            ? "border-b-indigo-600 text-indigo-600"
                                            : "border-gray-300 hover:border-indigo-600 hover:text-indigo-600"
                                    }`}
                                    onClick={() => editApplication(app)}
                                >
                                    {app.name}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='border-b-2 border-gray-300 w-full '></div>
                    <div className='h-full border-b-2 border-gray-300 pl-3 pb-3'>
                        {location.pathname !==
                            "/application/add-application" && (
                            <ButtonPlus
                                title={"Application"}
                                onClick={() => navigate("add-application")}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
