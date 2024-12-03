import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

export default function ListItem({ data, onClick }) {
    return (
        <button
            onClick={onClick}
        >
            <div className='p-4 bg-[#17479D] hover:bg-[#1c5fca] text-white font-semibold text-md flex flex-row justify-between items-center rounded-xl shadow-md'>
                <div>
                    {data.site_name}<span className='mx-3'>|</span>{data.site_url}
                </div>
                <div>
                    <ChevronDoubleRightIcon className='w-6 h-6' />
                </div>
            </div>
        </button>
    );
}
