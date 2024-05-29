import ButtonPlus from "../../components/elements/Button/ButtonPlus";
import { useState } from "react";

export default function TabApplication({
    dataApplications,
    selectedApplication,
}) {
    const [selectedApp, setSelectedApp] = useState(null);

    return (
        <>
            <div className='mt-8 mb-10'>
                <div className='flex items-start font-semibold text-lg py-3'>
                    Application
                </div>
                <div className='flex border-b-2 py-2 border-gray-300 items-center justify-between'>
                    <div className='flex items-start mb-2 gap-x-6'>
                        {dataApplications.map((app) => (
                            <button
                                key={app.id}
                                className={`text-gray-400 inline-flex text-lg pb-3 -mb-4 px-1 h-fit border-b-2 ${
                                    selectedApp === app.id
                                        ? "border-b-indigo-600 text-indigo-600"
                                        : "border-transparent hover:border-indigo-600 hover:text-indigo-600"
                                }`}
                                onClick={() => setSelectedApp(app.id)}
                            >
                                {app.name}
                            </button>
                        ))}
                    </div>
                    {location.pathname !==
                        "/application/add-application" && (
                        <div className='absolute right-8 flex items-end'>
                            <ButtonPlus
                                title={"Application"}
                                onClick={() => {}}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
