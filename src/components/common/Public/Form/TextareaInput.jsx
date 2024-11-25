import { forwardRef, useId } from "react";
import { twMerge } from "tailwind-merge";
import InputLabel from "./InputLabel";
import ErrorMessage from "./ErrorMessage";

const TextareaInput = forwardRef(function TextareaInputInternal(
    {
        required = false,
        label,
        className,
        error,
        disabled,
        inputClassName,
        labelClassName,
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
            className={twMerge("mb-2", labelClassName)}
          />
        )}
        <textarea
          className={twMerge(
            "form-textarea block h-32 w-full rounded-md border-0 py-1 text-sm font-medium shadow-sm ring-1 ring-inset ring-[#E1E3EA] placeholder:text-gray-400 focus:ring-inset focus:ring-[#E1E3EA] sm:text-sm sm:leading-6",
            inputClassName,
            disabled && "bg-gray-50 text-gray-500"
          )}
          required={required}
          ref={ref}
          id={id}
          {...props}
          disabled={disabled}
        />
        {error && <ErrorMessage error={error} />}
      </div>
    );
});

export default TextareaInput;
