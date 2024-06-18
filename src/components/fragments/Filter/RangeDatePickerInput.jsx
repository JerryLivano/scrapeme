import { useId } from "react";
import InputLabel from "../../elements/Input/Modal/InputLabel";
import { twMerge } from "tailwind-merge";
import Datepicker from "react-tailwindcss-datepicker";
import ErrorMessage from "../../layouts/ErrorMessage";

export default function RangeDatePickerInput({
    required = false,
    className,
    error,
    label,
    displayFormat = "DD/MM/YYYY",
    ...props
}) {
    const id = useId();
    return (
        <div className={twMerge("flex flex-col", className)}>
            {label && (
                <InputLabel
                    label={label}
                    required={required}
                    htmlFor={id}
                    className="mb-2"
                />
            )}
            <Datepicker
                showShortcuts
                i18n="en"
                popoverDirection="down"
                primaryColor={"indigo"}
                containerClassName={twMerge("relative w-full h-10 text-gray-700")}
                inputClassName={twMerge(
                    "form-input h-full w-full rounded-md border-0 text-sm font-medium text-black shadow-sm ring-1 ring-inset ring-[#E1E3EA] placeholder:text-gray-400 focus:bg-[#F9F9F9] focus:ring-inset focus:ring-[#E1E3EA] sm:text-sm sm:leading-6"
                )}
                toggleClassName={twMerge(
                    "absolute right-0 hidden h-full px-3 text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 xl:inline"
                )}
                displayFormat={displayFormat}
                inputId={id}
                {...props}
            />
            {error && <ErrorMessage error={error} />}
        </div>
    );
}
