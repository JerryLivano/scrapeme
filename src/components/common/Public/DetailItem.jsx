import { useId } from "react";
import { twMerge } from "tailwind-merge";
import DetailLabel from "./DetailLabel";

export default function DetailItem({
    required = false,
    label,
    className,
    text,
}) {
    const id = useId();
    return (
        <div className={twMerge("flex flex-col", className)}>
            {label && (
                <DetailLabel
                    label={label}
                    required={required}
                    htmlFor={id}
                    className={"mb-1"}
                />
            )}
            <div className={twMerge("flex h-full items-center")}>
                <div className="text-gray-700 max-w-[31rem] text-[16px] whitespace-normal break-words">
                    {text}
                </div>
            </div>
        </div>
    );
}
