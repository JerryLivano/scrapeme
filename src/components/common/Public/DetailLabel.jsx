import { twMerge } from "tailwind-merge";

export default function DetailLabel({ label, htmlFor, className }) {
    return (
        <label
            htmlFor={htmlFor}
            className={twMerge(
                "text-[18px] font-bold text-gray-700",
                className
            )}
        >
            {label}
        </label>
    );
}
