import { useEffect, useState } from "react";
import Spinner from "../../components/elements/Spinner/Spinner";
import { useGetApplicationQuery } from "../../services/applicationApiSlice";
import TabApplication from "./TabApplication";
import FormEditApplication from "./FormEditApplication";

export default function ApplicationPage() {
    const [selectedApplication, setSelectedApplication] = useState({});

    const {
        data: applications,
        isLoading,
        isSuccess,
        isError,
    } = useGetApplicationQuery({ page: 1, limit: 100 });

    useEffect(() => {
        if (isSuccess && applications.data.length > 0) {
            setSelectedApplication(applications.data[0]);
        }
    }, [isSuccess, applications]);

    return (
        <>
            <div className='flex flex-col items-center'>
                <div className='text-3xl mt-4 font-semibold'>
                    Manage Application
                </div>
            </div>
            {isLoading ? (
                <Spinner />
            ) : isError ? (
                <div className='text-3xl flex items-center'>
                    Error loading applications
                </div>
            ) : (
                <>
                    {isSuccess && (
                        <>
                            <TabApplication
                                dataApplications={applications.data}
                                selectedApplication={selectedApplication}
                                setSelectedApplication={setSelectedApplication}
                            />
                            {selectedApplication && (
                                <FormEditApplication
                                    application={selectedApplication}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
}
