import { forwardRef, useId } from "react";
import ErrorMessage from "./ErrorMessage";
import { twMerge } from "tailwind-merge";
import InputLabel from "./InputLabel";

const SingleLinePasswordInput = forwardRef(
    function SingleLinePasswordInputInternal(
        {
            required = false,
            disabled = false,
            label,
            type,
            placeholder = "",
            className = "",
            error,
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
                    <input
                        type={type}
                        id={id}
                        className={twMerge(
                            "form-input block h-10 w-full rounded-md border-0 text-sm font-medium leading-6 shadow-sm ring-1 ring-inset ring-[#E1E3EA] placeholder:text-gray-400 focus:ring-inset focus:ring-[#E1E3EA]",
                            disabled && "bg-gray-100 text-gray-500",
                            inputClassName
                        )}
                        placeholder={placeholder}
                        disabled={disabled}
                        required={required}
                        ref={ref}
                        {...props}
                    />
                    {endAdornment && (
                        <div
                            className={twMerge(
                                "absolute right-9 flex items-center"
                            )}
                        >
                            {endAdornment}
                        </div>
                    )}
                </div>
                {error && <ErrorMessage error={error} />}
            </div>
        );
    }
);

export default SingleLinePasswordInput;
