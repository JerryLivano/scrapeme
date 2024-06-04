import { useEffect, useId, useState } from "react";
import InputLabel from "../../../components/elements/Input/Modal/InputLabel";

export default function ModalCheckboxInput({ valueApp, item, onClick }) {
    const id = useId();

    return (
        <div className='flex w-48 items-start justify-start'>
            <div>
                <input
                    type='checkbox'
                    id={id}
                    onClick={() => onClick({ id: item.id, name: item.name })}
                    checked={valueApp.some((app) => app.id === item.id)}
                    className='h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-400 rounded cursor-pointer'
                />
            </div>
            <div className='ml-2'>
                <InputLabel label={item.name} htmlFor={id} />
            </div>
        </div>
    );
}
