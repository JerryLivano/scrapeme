import {
    CheckIcon,
    EllipsisVerticalIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function ButtonIconAction({ modifyAccess, setModifyAccess }) {
    const [modify, setModify] = useState(false)

    return (
        <>
            <form onSubmit={() => setModify(false)}>
                {!modify ? (
                    <button type='button' onClick={() => setModify(true)}>
                        <EllipsisVerticalIcon className='h-6 w-6 text-gray-600' />
                    </button>
                ) : (
                    <div className='flex justify-center gap-x-5'>
                        {/* Button cancel */}
                        <button
                            type='button'
                            onClick={() => setModify(false)}
                        >
                            <XMarkIcon className='h-6 w-6 text-gray-600' />
                        </button>
                        {/* Button submit */}
                        <button type='submit'>
                            <CheckIcon className='h-6 w-6 text-gray-600' />
                        </button>
                        {/* Button check all */}
                        <input
                            type='checkbox'
                            onChange={() => {}}
                            className='form-checkbox h-5 w-5 text-gray-600 cursor-pointer'
                        />
                    </div>
                )}
            </form>
        </>
    );
}
