import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function DebouncedInput({
    value: initialValue,
    onChange,
    debounceTime = 600,
    className,
    ...props
}) {
    const inputRef = useRef(null);
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const inputRefCurrent = inputRef.current;
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounceTime);

        return () => {
            clearTimeout(timeout);
            value !== "" && inputRefCurrent?.focus();
        };
    }, [value, onChange, debounceTime]);

    const clearInput = () => {
        setValue("");
    };

    return (
        <div className='relative w-[250px]'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 25 25'
                    strokeWidth={3}
                    stroke='#a1a5b7'
                    className='h-5 w-5'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                    />
                </svg>
            </div>
            {value !== "" ? (
                <div className='absolute inset-y-0 right-3 flex items-center pl-3'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='#a1a5b7'
                        className='h-4 w-4 cursor-pointer'
                        onClick={clearInput}
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='5'
                            d='M6 18L18 6M6 6l12 12'
                        />
                    </svg>
                </div>
            ) : null}
            <input
                {...props}
                className={twMerge("form-input", className)}
                value={value}
                ref={inputRef}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
