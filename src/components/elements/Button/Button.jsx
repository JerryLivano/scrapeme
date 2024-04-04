const Button = (props) => {
    const {
        children,
        bgColor = "bg-[#5c6ac4]",
        size,
        textColor = "text-white",
        type = "button",
        onClick = () => {},
        disabled,
        className = `flex justify-center w-full h-full rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${bgColor} ${size} ${textColor}`,
    } = { ...props };

    return (
        <>
            <button
                className={className}
                type={type}
                onClick={() => onClick()}
                disabled={disabled}
            >
                {children}
            </button>
        </>
    );
};

export default Button;
