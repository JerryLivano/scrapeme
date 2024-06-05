import { twMerge } from "tailwind-merge";

const Button = ({ text, type, onClick, disabled, className }) => {
    return (
        <>
            <button
                className={twMerge(
                    `flex justify-center rounded-md py-2 w-16 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 bg-[#5928ED] text-white`,
                    className
                )}
                type={type}
                onClick={onClick}
                disabled={disabled}
            >
                {text}
            </button>
        </>
    );
};

export default Button;
