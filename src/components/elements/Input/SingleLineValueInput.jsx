import { forwardRef, useId } from "react";
import ErrorMessage from "../../layouts/ErrorMessage";

const SingleLineValueInput = forwardRef(function SingleLineValueInputInternal(
    {
        required = false,
        disabled = false,
        label,
        className,
        value = "",
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
                    disabled={disabled}
                    required={required}
                    value={value}
                    className={
                        disabled
                            ? "block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                            : "block w-96 rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    }
                    ref={ref}
                    {...props}
                />
            </div>
            {error && <ErrorMessage error={error} />}
        </div>
    );
});

export default SingleLineValueInput;
