import { forwardRef, useId } from "react";
import InputLabel from "./InputLabel";
import { twMerge } from "tailwind-merge";
import ErrorMessage from "../../../layouts/ErrorMessage";

const ModalDropdownInput = forwardRef(function ModalDropdownInputInternal(
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
        <div className='flex mt-6 items-center justify-between'>
            <div className='w-2/5'>
                <InputLabel label={label} htmlFor={id} />
            </div>
            <div className='w-full'>
                <div className='flex w-2/3'>
                    <select
                        className={twMerge(
                            "form-select block flex-1 truncate rounded-md border-0 text-sm font-medium text-brm-font-black shadow-sm ring-1 ring-inset ring-[#E1E3EA] invalid:text-gray-400 focus:bg-[#F9F9F9] focus:ring-inset focus:ring-[#E1E3EA] sm:text-sm sm:leading-6 [&>option]:text-brm-font-black",
                            disabled &&
                                "cursor-not-allowed bg-gray-100 text-gray-400"
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

export default ModalDropdownInput;
