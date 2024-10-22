import { PlusIcon } from "@heroicons/react/24/solid";

export default function ButtonAdd({ title, onClick }) {
    return (
        <button
            className='group flex items-center rounded-md bg-blue-100 p-3 text-center text-sm font-semibold text-[#3E97FF] shadow-sm hover:bg-[#3E97FF] hover:text-blue-100'
            type='button'
            onClick={onClick}
            title={title}
        >
            <PlusIcon
                className='mr-2 h-5 w-5 rounded-md bg-blue-200 p-0.5 font-bold text-[#3E97FF]'
                aria-hidden='true'
            />
            {title}
        </button>
    );
}
