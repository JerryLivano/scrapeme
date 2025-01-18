import { twMerge } from "tailwind-merge";

export default function ButtonSubmitModal({
    text = "Submit",
    className = "px-4 py-2",
    ...props
}) {
    return (
        <button
            className={twMerge(
                "rounded-md bg-[#17479D] text-base font-semibold text-white shadow outline-none transition-all duration-150 ease-linear hover:bg-[#70a7ff] hover:shadow-lg focus:outline-none disabled:cursor-not-allowed disabled:bg-[#3E97FF]/50 disabled:hover:shadow-none",
                className
            )}
            type='submit'
            {...props}
        >
            {text}
        </button>
    );
}
