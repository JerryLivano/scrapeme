import { PlusIcon } from "@heroicons/react/24/solid";

export default function ButtonPlus({ title, onClick }) {
    return (
        <button
            className='group flex items-center rounded-md bg-[#5928ED] p-3 text-center text-sm font-semibold text-white hover:bg-indigo-500'
            type='button'
            onClick={onClick}
            title={`Add data ${title}`}
        >
            <PlusIcon
                className='mr-2 h-5 w-5 rounded-md font-bold text-white'
                aria-hidden='true'
            />
            {title}
        </button>
    );
}
