import { forwardRef, useId } from "react";
import { twMerge } from "tailwind-merge";
import AuthErrorMessage from "./AuthErrorMessage";

const AuthInput = forwardRef(function AuthInputInterval(
    { label, error, type, className, endAdornment, ...props },
    ref
) {
    const id = useId();
    return (
        <div className={twMerge(className)}>
            <div className={twMerge("relative")}>
                <input
                    id={id}
                    className={twMerge(
                        "peer block w-full appearance-none rounded-md border-2 border-[#E1E3EA] bg-white px-4 pb-2.5 pt-5 text-sm font-semibold text-[#181C32] focus:border-[#00549B] focus:outline-none focus:ring-0",
                        error && "border-red-500 focus:border-red-500"
                    )}
                    placeholder=''
                    required
                    type={type}
                    ref={ref}
                    {...props}
                />
                <label
                    htmlFor={id}
                    className='absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 text-sm font-medium text-[#A1A5B7] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-[#A1A5B7]'
                >
                    {label}
                </label>
                {endAdornment && (
                    <div
                        className={twMerge(
                            "absolute inset-y-0 right-0 flex items-center pr-4"
                        )}
                    >
                        {endAdornment}
                    </div>
                )}
            </div>
            <AuthErrorMessage message={error} />
        </div>
    );
});

export default AuthInput;
