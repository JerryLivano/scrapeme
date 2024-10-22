import { forwardRef, useId } from "react";
import ErrorMessage from "./ErrorMessage";
import { twMerge } from "tailwind-merge";
import InputLabel from "./InputLabel";

const SingleLineInput = forwardRef(function SingleLineInputInternal(
    {
        required = false,
        disabled = false,
        label,
        type = "text",
        placeholder = "",
        className = "",
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
        <div className={twMerge("flex flex-col", className)}>
            {label && (
                <InputLabel
                    label={label}
                    required={required}
                    htmlFor={id}
                    className='mb-2'
                />
            )}
            <div className={twMerge("flex h-full w-full items-center")}>
                {startAdornment && (
                    <span className='form-input h-full whitespace-nowrap rounded-s-md border-0 bg-[#F3F4F6] px-2 text-sm font-medium leading-6 text-brm-font-black shadow-sm ring-1 ring-inset ring-[#E1E3EA] placeholder:text-gray-400 focus:ring-inset  focus:ring-[#E1E3EA]'>
                        {startAdornment}
                    </span>
                )}
                <input
                    type={type}
                    id={id}
                    className={twMerge(
                        "form-input block h-10 w-full rounded-md border-0 text-sm font-medium leading-6 text-brm-font-black shadow-sm ring-1 ring-inset ring-[#E1E3EA] placeholder:text-gray-400 focus:ring-inset focus:ring-[#E1E3EA]",
                        disabled && "bg-gray-100 text-gray-500",
                        startAdornment && "rounded-none rounded-r-md",
                        endAdornment && "rounded-none rounded-l-md",
                        startAdornment && endAdornment && "rounded-none",
                        inputClassName
                    )}
                    placeholder={placeholder}
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

export default SingleLineInput;
