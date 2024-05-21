import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ButtonDelete({onClick }) {
    return (
        <button
            className='group flex items-center rounded-md bg-transparent text-center text-sm font-semibold text-black'
            type='button'
            onClick={onClick}
        >
            <XMarkIcon
                className='mr-2 h-4 w-4 -ml-2 rounded-md font-bold text-black'
                aria-hidden='true'
            />
        </button>
    );
}