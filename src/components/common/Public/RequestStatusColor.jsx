export default function RequestStatusColor({ status }) {
    switch (status) {
        case 1:
            return (
                <div className='flex w-24 items-center justify-center rounded-md bg-[#E8FFF3] py-2 text-[#50CD89]'>
                    <p className='text-xs font-semibold'>Accepted</p>
                </div>
            );
        case 2:
            return (
                <div className='flex w-24 items-center justify-center rounded-md bg-[#e1f8ff] py-2 text-[#03acca]'>
                    <p className='text-xs font-semibold'>Done</p>
                </div>
            );
        case -1:
            return (
                <div className='flex w-24 items-center justify-center rounded-md bg-[#FFF5F8] py-2 text-[#D9214E]'>
                    <p className='text-xs font-semibold'>Declined</p>
                </div>
            );
        case 0:
            return (
                <div className='flex w-24 items-center justify-center rounded-md bg-[#FFF8DD] py-2 text-[#F6C000]'>
                    <p className='text-xs font-semibold'>Pending</p>
                </div>
            );
    }
}
