import { twMerge } from "tailwind-merge";

export default function InputLabel({ label, htmlFor, className }) {
    return (
        <label
            htmlFor={htmlFor}
            className={twMerge("text-black whitespace-nowrap", className)}
        >
            {label}
        </label>
    );
}
