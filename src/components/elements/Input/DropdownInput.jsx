import { forwardRef, useId } from "react";
import { twMerge } from "tailwind-merge";
import ErrorMessage from "../../layouts/ErrorMessage";

const DropdownInput = forwardRef(function DropdownInputInternal(
    {
        required = false,
        label,
        placeholder,
        children,
        className,
        error,
        disabled,
        ...props
    },
    ref
) {
    return (
        <div className={twMerge("flex flex-col", className)}>
            <select
                className={twMerge(
                    "form-select block h-full w-full flex-1 truncate rounded-md border-0 text-sm font-medium text-brm-font-black shadow-sm ring-1 ring-inset ring-[#E1E3EA] invalid:text-gray-400 focus:bg-[#F9F9F9] focus:ring-inset focus:ring-[#E1E3EA] sm:text-sm sm:leading-6 [&>option]:text-brm-font-black",
                    disabled && "cursor-not-allowed bg-gray-100 text-gray-400"
                )}
                ref={ref}
                {...props}
                required={required}
                disabled={disabled}
            >
                {placeholder && (
                    <option
                        value=''
                        disabled={required}
                        hidden={required}
                        className='!text-gray-400'
                    >
                        {placeholder}
                    </option>
                )}
                {children}
            </select>
            {error && <ErrorMessage error={error} />}
        </div>
    );
});

export default DropdownInput;
