export default function StatusColorBoolean({ status }) {
    switch (status) {
        case true:
            return (
                <div className='flex w-24 items-center justify-center rounded-md bg-[#E8FFF3] py-2 text-[#50CD89]'>
                    <p className='text-xs font-semibold'>Active</p>
                </div>
            );
        case false:
            return (
                <div className='flex w-24 items-center justify-center rounded-md bg-[#FFF5F8] py-2 text-[#D9214E]'>
                    <p className='text-xs font-semibold'>Inactive</p>
                </div>
            );
    }
}
