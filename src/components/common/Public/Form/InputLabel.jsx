import { twMerge } from "tailwind-merge";

export default function InputLabel({ label, required, htmlFor, className }) {
    return (
        <label
            htmlFor={htmlFor}
            className={twMerge(
                "text-sm font-bold text-gray-700",
                className
            )}
        >
            {label}
            {required && (
                <span className={twMerge("ml-1 text-red-600")}>*</span>
            )}
        </label>
    );
}
