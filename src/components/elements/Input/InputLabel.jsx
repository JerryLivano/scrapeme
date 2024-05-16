import { twMerge } from "tailwind-merge";

export default function InputLabel({ label, required, htmlFor, className }) {
    return (
        <label
            htmlFor={htmlFor}
            className={twMerge("text-sm font-bold text-black", className)}
        >
            {label}
            {required && <span className={"ml-1 text-red-600"}>*</span>}
        </label>
    );
}
