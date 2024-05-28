import Spinner from "../../../components/elements/Spinner/Spinner";
import { useGetApplicationQuery } from "../../../services/applicationApiSlice";
import TabApplication from "../TabApplication";
import FormAddApplication from "./FormAddApplication";

export default function AddApplication() {
    const {
        data: applications,
        isLoading,
        isSuccess,
        isError,
    } = useGetApplicationQuery({ page: 1, limit: 100 });

    return (
        <>
            <div className='flex flex-col items-center'>
                <div className='text-3xl mt-4 font-semibold'>
                    Add Application
                </div>
            </div>
            {isSuccess ? (
                <>
                    <TabApplication dataApplications={applications.data} />
                    <FormAddApplication />
                </>
            ) : (
                <Spinner />
            )}
        </>
    );
}
