import { twMerge } from "tailwind-merge";

export default function ErrorMessage({
    error,
    className
}) {
    return <p className={twMerge("text-xs text-red-500", className)}>{error}</p>;
}