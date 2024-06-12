import { useId } from "react";
import { twMerge } from "tailwind-merge";
import Datepicker from "react-tailwindcss-datepicker";
import ErrorMessage from "../../layouts/ErrorMessage";

export default function RangeDatePickerInput({
    required = false,
    className,
    error,
    value,
    onChange,
    displayFormat = "DD/MM/YYYY",
    ...props
}) {
    const id = useId();

    return (
        <div className={twMerge("w-full", className)}>
            <Datepicker
                value={value}
                onChange={onChange}
                showShortcuts
                i18n='en'
                popoverDirection='down'
                primaryColor={"indigo"}
                containerClassName={twMerge("relative w-full text-gray-700")}
                inputClassName={twMerge(
                    "form-input cursor-pointer h-full w-full rounded-md border border-gray-300 text-sm font-medium text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                )}
                toggleClassName={twMerge(
                    "absolute right-0 top-0 h-full px-3 text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
                )}
                displayFormat={displayFormat}
                inputId={id}
                {...props}
            />
            {error && <ErrorMessage error={error} />}
        </div>
    );
}
