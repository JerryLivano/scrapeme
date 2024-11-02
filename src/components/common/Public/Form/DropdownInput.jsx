import { forwardRef, useId } from "react";
import ErrorMessage from "./ErrorMessage";
import InputLabel from "./InputLabel";
import { twMerge } from "tailwind-merge";

const DropdownInput = forwardRef(function DropdownInputInternal(
    {
        required = false,
        label,
        value,
        placeholder,
        children,
        className,
        error,
        disabled,
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
            <select
                className={twMerge(
                    "form-select block h-full w-full flex-1 truncate rounded-md border-0 text-sm font-medium shadow-sm ring-1 ring-inset ring-[#E1E3EA] invalid:text-gray-400 focus:bg-[#F9F9F9] focus:ring-inset focus:ring-[#E1E3EA] sm:text-sm sm:leading-6",
                    disabled && "cursor-not-allowed bg-gray-100 text-gray-400"
                )}
                ref={ref}
                value={value ? value : ""}
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
