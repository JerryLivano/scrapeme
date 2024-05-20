import { forwardRef, useId } from "react";
import ErrorMessage from "../../layouts/ErrorMessage";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const SingleLineInput = forwardRef(function SingleLineInputInternal(
    {
        required = false,
        disabled = false,
        notFound = false,
        placeholder,
        label,
        className,
        hasValue = false,
        onChange,
        value,
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
        <div>
            <div className='relative mt-2 rounded-md shadow-sm'>
                <input
                    id={id}
                    placeholder={placeholder ?? ""}
                    disabled={disabled}
                    required={required}
                    onChange={onChange}
                    className={
                        disabled
                            ? "block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                            : `block w-96 rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ${
                                  notFound ? "ring-red-600" : "ring-gray-300"
                              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`
                    }
                    ref={ref}
                    {...props}
                />
                {notFound && (
                    <div className='absolute inset-y-0 right-0 pr-2 w-9 h-9 flex items-center pointer-events-none text-red-600'>
                        <ExclamationCircleIcon />
                    </div>
                )}
            </div>
            {error && <ErrorMessage error={error} />}
        </div>
    );
});

export default SingleLineInput;
