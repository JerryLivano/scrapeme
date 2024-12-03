import { forwardRef, useId } from "react";
import { twMerge } from "tailwind-merge";
import InputLabel from "./InputLabel";
import ErrorMessage from "./ErrorMessage";

const TemplateDropdown = forwardRef(function TemplateDropdownInternal(
    {
        required = false,
        label,
        placeholder = "",
        children,
        className,
        error,
        disabled,
        checked,
        setChecked,
        checkboxLabel,
        ...props
    },
    ref
) {
    const id = useId();
    const labelId = useId();
    return (
        <div className={twMerge("flex flex-row items-center", className)}>
            {label && (
                <div className='w-1/5'>
                    <InputLabel
                        label={label}
                        required={required}
                        htmlFor={id}
                    />
                </div>
            )}
            <div className='flex h-full w-3/5 items-center'>
                <select
                    className={twMerge(
                        "form-select block h-full w-full flex-1 truncate rounded-md border-0 text-sm font-medium shadow-sm ring-1 ring-inset ring-[#E1E3EA] invalid:text-gray-400 focus:bg-[#F9F9F9] focus:ring-inset focus:ring-[#E1E3EA] sm:text-sm sm:leading-6",
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
    );
});

export default TemplateDropdown;
