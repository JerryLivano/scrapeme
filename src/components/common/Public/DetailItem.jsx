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
        <div className={twMerge("flex flex-col my-6", className)}>
            {label && (
                <DetailLabel
                    label={label}
                    required={required}
                    htmlFor={id}
                    className={"mb-1"}
                />
            )}
            <div className={twMerge("flex h-full w-[31rem] items-center")}>
                <div className="text-gray-700 text-[16px]">
                    {text}
                </div>
            </div>
        </div>
    );
}
