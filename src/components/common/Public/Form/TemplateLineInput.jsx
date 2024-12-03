import { forwardRef, useId } from "react";
import { twMerge } from "tailwind-merge";
import InputLabel from "./InputLabel";
import ErrorMessage from "./ErrorMessage";

const TemplateLineInput = forwardRef(function TemplateLineInputInternal(
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
        checkboxLabel = ["Id", "Class"],
        checked,
        setChecked,
        ...props
    },
    ref
) {
    const id = useId();
    return (
        <div className={twMerge("flex flex-col gap-y-1", className)}>
            <div className='flex flex-row justify-between'>
                {label && (
                    <div>
                        <InputLabel
                            label={label}
                            required={required}
                            htmlFor={id}
                        />
                    </div>
                )}
                <div className='flex flex-row gap-x-4'>
                    {checkboxLabel.map((label, index) => {
                        const labelId = useId();
                        return (
                            <div key={label}>
                                <input
                                    type='checkbox'
                                    id={labelId}
                                    checked={checked[index]}
                                    onChange={() => setChecked(index)}
                                    className='rounded w-5 h-5 shadow-sm border-gray-400 ring-transparent focus:ring-transparent cursor-pointer'
                                />
                                <label
                                    htmlFor={labelId}
                                    className='text-[14px] text-gray-700 font-light ms-1'
                                >
                                    {label}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={twMerge(`flex h-full w-full items-center`)}>
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
        </div>
    );
});

export default TemplateLineInput;
