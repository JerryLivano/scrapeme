import LogActivityTable from "./LogActivityTable";

const LogActivity = () => {
    return (
        <>
            <div className='flex flex-col items-center'>
                <div className='text-3xl mt-4 font-semibold'>Log Activity</div>
            </div>
            <div className='mt-10'>
                <LogActivityTable />
            </div>
        </>
    );
};

export default LogActivity;
