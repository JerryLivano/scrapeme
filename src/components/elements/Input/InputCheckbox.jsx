import { useEffect, useState } from "react";

export default function InputCheckbox({ value, app }) {
    return (
        <div className='flex justify-center'>
            <input
                type='checkbox'
                checked={app ? app.some((app) => app === value) : false}
                className='form-checkbox h-5 w-5 text-gray-600 focus:outline-none focus:ring-0'
            />
        </div>
    );
}
