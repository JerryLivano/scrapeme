import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function ButtonDetail({onClick, disabled }) {
    return (
        <button
            className='group flex items-center rounded-full bg-transparent text-center text-sm font-semibold text-white'
            type='button'
            onClick={onClick}
            disabled={disabled}

        >
            <ExclamationCircleIcon
                className='mr-2 h-5 w-5 -ml-2 rounded-full font-bold text-white bg-black'
                aria-hidden='true'
            />
        </button>
    );
}