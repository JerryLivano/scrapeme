import { useId } from "react";
import { twMerge } from "tailwind-merge";

export default function RangeDatePickerInput({
    required = false,
    label,
    className,
    error,
    displayFormat = "DD/MM/YYYY",
    ...props
}) {
    const id = useId();

    return (
        <div className={twMerge("flex flex-col", className)}></div>
    )
}