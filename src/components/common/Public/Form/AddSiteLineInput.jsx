import { forwardRef, useId } from "react";
import { twMerge } from "tailwind-merge";
import InputLabel from "./InputLabel";
import ErrorMessage from "./ErrorMessage";

const AddSiteLineInput = forwardRef(function AddSiteLineInputInternal(
    {
        required = false,
        disabled = false,
        label,
        type = "text",
        placeholder = "",
        className = "",
        customWidth = false,
        error,
        inputClassName,
        checkbox = false,
        checkboxLabel,
        checked,
        setChecked,
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
            <div className={twMerge(`flex flex-col h-full ${customWidth ? customWidth : "w-3/5"} items-start justify-start`)}>
                <input
                    type={type}
                    id={id}
                    className={twMerge(
                        "form-input block h-10 w-full rounded-md border-0 text-sm font-medium leading-6 shadow-sm ring-1 ring-inset ring-[#E1E3EA] placeholder:text-gray-400 focus:ring-inset focus:ring-[#E1E3EA]",
                        disabled && "bg-gray-50 text-gray-500",
                        inputClassName
                    )}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    ref={ref}
                    {...props}
                />
                {error && <ErrorMessage error={error} />}
            </div>
            {checkbox && (
                <div className='flex flex-row ms-2 items-center justify-center'>
                    <input
                        type='checkbox'
                        id={labelId}
                        checked={checked}
                        onChange={setChecked}
                        className='rounded w-5 h-5 shadow-sm border-gray-400 ring-transparent focus:ring-transparent cursor-pointer'
                    />
                    <label htmlFor={labelId} className='text-[14px] text-gray-700 font-light ms-1'>
                        {checkboxLabel}
                    </label>
                </div>
            )}
        </div>
    );
});

export default AddSiteLineInput;
