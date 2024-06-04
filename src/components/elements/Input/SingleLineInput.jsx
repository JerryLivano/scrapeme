import { forwardRef, useId, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import ErrorLabel from "../../fragments/Notification/ErrorLabel";
import ErrorMessage from "../../layouts/ErrorMessage";
import { twMerge } from "tailwind-merge";

const SingleLineInput = forwardRef(function SingleLineInputInternal(
    {
        required = false,
        disabled = false,
        notFound = false,
        placeholder,
        label,
        errorMessage,
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
    const [showError, setShowError] = useState(false);

    console.log(showError);

    return (
        <>
            <div className='relative flex h-full w-full items-center rounded-md'>
                <div className='flex w-96'>
                    {startAdornment && (
                        <span className='form-input whitespace-nowrap rounded-s-md border-0 bg-[#F3F4F6] px-3 text-sm text-gray-500 font-medium leading-6 shadow-sm ring-1 ring-inset ring-[#E1E3EA] placeholder:text-gray-400 focus:ring-inset  focus:ring-[#E1E3EA]'>
                            {startAdornment}
                        </span>
                    )}
                    <input
                        id={id}
                        placeholder={placeholder ?? ""}
                        disabled={disabled}
                        required={required}
                        onChange={onChange}
                        className={
                            disabled
                                ? "block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                                : twMerge(
                                      "block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                                      notFound
                                          ? "ring-red-600"
                                          : "ring-gray-300",
                                      startAdornment
                                          ? "rounded-none rounded-r-md w-full"
                                          : "w-full"
                                  )
                        }
                        ref={ref}
                        {...props}
                    />
                </div>
                {notFound && (
                    <div
                        className='absolute inset-y-0 right-0 pr-2 w-9 h-9 flex items-center text-red-600 cursor-pointer'
                        onMouseEnter={() => setShowError(true)}
                        onMouseLeave={() => setShowError(false)}
                    >
                        <ExclamationCircleIcon />
                    </div>
                )}
                {error && <ErrorMessage error={error} />}
                {showError ? (
                    <div className='absolute right-[-230px]'>
                        <ErrorLabel message={errorMessage} />
                    </div>
                ) : null}
            </div>
        </>
    );
});

export default SingleLineInput;
