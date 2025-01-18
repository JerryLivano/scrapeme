import { twMerge } from "tailwind-merge";

export default function AvgCardListItem({
    title,
    count,
    icon,
    labelIcon,
    color,
}) {
    return (
        <div
            className={twMerge(
                "overflow-hidden rounded-xl",
                color
            )}
        >
            <div className='flex justify-start text-xl px-6 py-4 font-semibold text-white'>
                {labelIcon}
            </div>
            <div className='flex justify-end gap-x-2 px-6 pb-4'>
                <div className='text-3xl font-semibold text-white'>{count}</div>
                <div className='flex flex-col pb-[2px] justify-end text-white text-xl'>{title}</div>
            </div>
        </div>
    );
}
