import { forwardRef, useId } from "react";
import { twMerge } from "tailwind-merge";
import ErrorMessage from "../../layouts/ErrorMessage";
import InputLabel from "./Modal/InputLabel";

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
    const id = useId();
    return (
        <div className='flex h-full w-full items-center'>
            <div className='w-2/5 items-start font-semibold text-lg'>
                <InputLabel label={label} htmlFor={id} />
            </div>
            <div className='flex w-full'>
                <div className={className}>
                    <select
                        className={twMerge(
                            "form-select block h-full w-full flex-1 cursor-pointer truncate rounded-md border-0 text-sm font-medium text-brm-font-black shadow-sm ring-1 ring-inset ring-[#E1E3EA] invalid:text-gray-400 focus:bg-[#F9F9F9] focus:ring-inset focus:ring-[#E1E3EA] [&>option]:text-brm-font-black",
                            disabled &&
                                "cursor-not-allowed bg-gray-100 text-gray-4"
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
                </div>
                {error && <ErrorMessage error={error} />}
            </div>
        </div>
    );
});

export default DropdownInput;
