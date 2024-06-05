import { forwardRef, useId } from "react";
import InputLabel from "./InputLabel";
import { twMerge } from "tailwind-merge";
import ErrorMessage from "../../../layouts/ErrorMessage";

const ModalSingleLineInput = forwardRef(function ModalSingleLineInputInternal(
    {
        required = false,
        disabled = false,
        label,
        className,
        error,
        startAdornment,
        endAdornment,
        inputClassName,
        ...props
    },
    ref
) {
    const id = useId();
    return (
        <div className='flex mt-6 items-center justify-between'>
            <div className='w-2/5'>
                <InputLabel label={label} htmlFor={id} />
            </div>
            <div className='flex w-full'>
                {startAdornment && (
                    <span className='form-input h-full whitespace-nowrap rounded-s-md border-0 bg-[#F3F4F6] px-2 text-sm font-medium leading-6 text-brm-font-black shadow-sm ring-1 ring-inset ring-[#E1E3EA] placeholder:text-gray-400 focus:ring-inset  focus:ring-[#E1E3EA]'>
                        {startAdornment}
                    </span>
                )}
                <input
                    type='text'
                    id={id}
                    className={twMerge(
                        "form-input block h-10 w-full rounded-md border-0 text-sm font-medium leading-6 text-brm-font-black shadow-sm ring-1 ring-inset ring-[#E1E3EA] placeholder:text-gray-400 focus:ring-inset focus:ring-[#E1E3EA]",
                        disabled && "text-gray-400",
                        startAdornment && "rounded-none rounded-r-md",
                        endAdornment && "rounded-none rounded-l-md",
                        startAdornment && endAdornment && "rounded-none",
                        inputClassName
                    )}
                    disabled={disabled}
                    required={required}
                    ref={ref}
                    {...props}
                />
                {endAdornment && (
                    <span className='form-input h-full whitespace-nowrap rounded-e-md border-0 px-2 text-sm font-medium leading-6 text-brm-font-black shadow-sm ring-1 ring-inset ring-[#E1E3EA] placeholder:text-gray-400 focus:ring-inset focus:ring-[#E1E3EA]'>
                        {endAdornment}
                    </span>
                )}
            </div>
            {error && <ErrorMessage error={error} />}
        </div>
    );
});

export default ModalSingleLineInput;
