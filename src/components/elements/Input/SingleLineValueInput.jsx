import { forwardRef, useId } from "react";
import ErrorMessage from "../../layouts/ErrorMessage";
import InputLabel from "./Modal/InputLabel";
import { twMerge } from "tailwind-merge";

const SingleLineValueInput = forwardRef(function SingleLineValueInputInternal(
    {
        required = false,
        disabled = false,
        label,
        className,
        value = "",
        error,
        startAdornment,
        endAdornment,
        inputClassName,
        notFound,
        ...props
    },
    ref
) {
    const id = useId();

    return (
        <div className='flex h-full w-full items-center'>
            <div className='w-2/5 items-start font-semibold text-lg'>
                <InputLabel label={label} htmlFor={id} />
            </div>
            <div className='flex w-full items-start'>
                <div className='flex w-3/5 relative'>
                    {startAdornment && (
                        <span
                            className='form-input flex items-center justify-center whitespace-nowrap rounded-s-md border-0 bg-[#F3F4F6] px-3 text-sm text-gray-500 font-medium leading-6 shadow-sm ring-1 ring-inset ring-[#E1E3EA] placeholder:text-gray-400 focus:ring-inset focus:ring-[#E1E3EA]'
                            style={{
                                height: "2.375rem",
                                lineHeight: "2.375rem",
                                boxSizing: "border-box",
                            }}
                        >
                            {startAdornment}
                        </span>
                    )}
                    <input
                        id={id}
                        disabled={disabled}
                        required={required}
                        value={value}
                        className={twMerge(
                            "block rounded-md border-0 py-1.5 pr-10 bg-gray-100 text-gray-400 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                            notFound ? "ring-red-600" : "ring-gray-300",
                            startAdornment
                                ? "rounded-none rounded-r-md w-full"
                                : "w-full"
                        )}
                        style={{
                            height: "2.375rem",
                            boxSizing: "border-box",
                        }}
                        ref={ref}
                        {...props}
                    />
                    {endAdornment && (
                        <span className='absolute inset-y-0 right-2 flex items-center pr-3'>
                            {endAdornment}
                        </span>
                    )}
                </div>
            </div>
            {error && <ErrorMessage error={error} />}
        </div>
    );
});

export default SingleLineValueInput;
