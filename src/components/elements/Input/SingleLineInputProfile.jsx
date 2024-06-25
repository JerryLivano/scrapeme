import { forwardRef, useId, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import ErrorLabel from "../../fragments/Notification/ErrorLabel";
import ErrorMessage from "../../layouts/ErrorMessage";
import { twMerge } from "tailwind-merge";
import InputLabel from "./Modal/InputLabel";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const SingleLineInputProfile = forwardRef(
    function SingleLineInputProfileInternal(
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
            isPassword = false,
            inputLabel = true,
            ...props
        },
        ref
    ) {
        const id = useId();
        const [showPassword, setShowPassword] = useState(false);
        const [showError, setShowError] = useState(false);

        return (
            <>
                <div className='flex h-full w-full items-center'>
                    {inputLabel && (
                        <div className='w-2/5 items-start font-semibold text-lg'>
                            <InputLabel label={label} htmlFor={id} />
                        </div>
                    )}
                    <div className='flex w-full items-center'>
                        <div className='flex w-2/5 relative'>
                            <input
                                id={id}
                                type={
                                    isPassword
                                        ? showPassword
                                            ? "text"
                                            : "password"
                                        : "text"
                                }
                                placeholder={placeholder ?? ""}
                                disabled={disabled}
                                required={required}
                                onChange={onChange}
                                className={
                                    disabled
                                        ? "block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                                        : twMerge(
                                              "block rounded-md border-0 py-1.5 pr-11 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                                              notFound
                                                  ? "ring-red-600"
                                                  : "ring-gray-300"
                                          )
                                }
                                style={{
                                    height: "2.375rem",
                                    boxSizing: "border-box",
                                }}
                                ref={ref}
                                {...props}
                            />
                            {isPassword && (
                                <div
                                    className='absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer'
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className='w-5 h-5' />
                                    ) : (
                                        <EyeIcon className='w-5 h-5' />
                                    )}
                                </div>
                            )}
                        </div>
                        {notFound && (
                            <div
                                className='items-center text-red-600 cursor-pointer'
                                onMouseEnter={() => setShowError(true)}
                                onMouseLeave={() => setShowError(false)}
                            >
                                <ExclamationCircleIcon className='w-7 h-7' />
                            </div>
                        )}
                        {showError ? (
                            <div className='ml-1'>
                                <ErrorLabel message={errorMessage} />
                            </div>
                        ) : null}
                    </div>
                    {error && <ErrorMessage error={error} />}
                </div>
            </>
        );
    }
);

export default SingleLineInputProfile;
