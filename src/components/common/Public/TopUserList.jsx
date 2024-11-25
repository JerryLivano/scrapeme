export default function TopUserList({ name, email, dataCount }) {
    return (
        <div className='rounded-lg shadow bg-white w-full px-4 py-3 flex flex-row gap-x-2 justify-between'>
            <div className='flex flex-col gap-y-1'>
                <div className='text-[16px] font-bold text-gray-800'>
                    {name}
                </div>
                <div className='text-[14px] text-gray-600 font-extralight'>
                    {email}
                </div>
            </div>
            <div className='flex flex-col justify-center text-[22px]'>
                <div className="text-gray-800">
                    {dataCount + " "}
                    <span className='font-extralight text-[16px]'>Scraped</span>
                </div>
            </div>
        </div>
    );
}
