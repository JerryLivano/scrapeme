import FormAddApplication from "./AddApplication/FormAddApplication";
import TabApplication from "./TabApplication";

export default function ManageApp() {
    return (
        <>
            <div className='flex flex-col items-center'>
                <div className='text-3xl mt-4 font-semibold'>
                    {location.pathname === "/application"
                        ? "Manage Application"
                        : "Add Application"}
                </div>
            </div>
            <TabApplication />
            {location.pathname === "/application/add-application" && (
                <FormAddApplication />
            )}
        </>
    );
}
