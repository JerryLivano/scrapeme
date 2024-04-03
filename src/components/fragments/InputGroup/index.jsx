import {
    ExclamationCircleIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";

export default function InputGroup({
    id,
    name,
    placeholder,
    type,
    required,
    errors,
    register,
    disabled,
    readOnly,
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className='relative mt-2 rounded-md shadow-sm'>
            {type == "text" && (
                <>
                    <input
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        type={type}
                        className={
                            errors
                                ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                : "block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        }
                        aria-invalid={errors[name] ? "true" : "false"}
                        aria-describedby={`${id}-error`}
                        {...register(name, {
                            required: required
                                ? "This field is required"
                                : false,
                        })}
                        {...props}
                    />
                </>
            )}
            {type == "email" && (
                <>
                    <input
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        type={type}
                        className={
                            errors[name]
                                ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                : "block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        }
                        aria-invalid={errors[name] ? "true" : "false"}
                        aria-describedby={`${id}-error`}
                        {...register(name, {
                            required: required
                                ? "This field is required"
                                : false,
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message:
                                    "Invalid email format. ex: admin@ms.mii.co.id",
                            },
                        })}
                        {...props}
                    />
                </>
            )}
            {type == "password" && (
                <>
                    <input
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        type={showPassword ? "text" : "password"}
                        className={
                            errors[name]
                                ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                : "block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        }
                        aria-invalid={errors[name] ? "true" : "false"}
                        aria-describedby={`${id}-error`}
                        {...register(name, {
                            required: required
                                ? "This field is required"
                                : false,
                            minLength: {
                                value: 8,
                                message: `Password must have at least 8 characters`,
                            },
                        })}
                        {...props}
                    />
                </>
            )}
            <div className='inset-y-0 right-0 flex items-center pr-3 pointer-events-none static float-end mt-[-28px]'>
                {/* <ExclamationCircleIcon
                    className='w-5 h-5 text-red-500'
                    aria-hidden='true'
                /> */}
                <button
                    hidden={type == "password" ? false : true}
                    type='button'
                    className='ml-1 pointer-events-auto'
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeIcon
                            className='w-5 h-5 text-gray-400'
                            aria-hidden='true'
                        />
                    ) : (
                        <EyeSlashIcon
                            className='w-5 h-5 text-gray-400'
                            aria-hidden='true'
                        />
                    )}
                </button>
            </div>
            {errors[name] && (
                <p className='mt-2 text-sm text-red-600' id={`${id}-error`}>
                    {errors[name].message}
                </p>
            )}
        </div>
    );
}
