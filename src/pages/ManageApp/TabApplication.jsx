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
                <div className='flex items-start font-semibold text-lg py-3'>Application</div>
                <div className='flex border-b-2 items-center justify-between'>
                    <div className='flex items-start gap-x-6'>
                        {dataApplications.map((app) => (
                            <button
                            key={app.id}
                            className={`border-b border-white inline-flex text-lg pb-5 hover:text-blue-700 hover:border-b-blue-700 h-fit ${
                              selectedApp === app.id ? "border-b-blue-700 text-blue-700" : ""
                            }`}
                            onClick={() => setSelectedApp(app.id)}
                          >
                            {app.name}
                          </button>
                        ))}
                        
                    </div>
                    {location.pathname !== "/manage-application/add-application" && (
                        <div className='flex items-end'>
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
