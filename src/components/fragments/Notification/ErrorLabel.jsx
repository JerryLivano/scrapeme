import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function ErrorLabel({ message }) {
    return (
        <div className='flex items-center bg-red-100 pr-5 rounded-r-md'>
            <div className='h-9 w-1 bg-red-600'></div>
            <ExclamationTriangleIcon className='h-5 w-5 text-red-600 ml-2' />
            <span className='ml-2 text-red-600'>{message}</span>
        </div>
    );
}
