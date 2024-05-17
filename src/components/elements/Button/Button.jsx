const Button = (props) => {
    const {
        text,
        bgColor = "#5928ED",
        secColor = "indigo-500",
        textColor = "white",
        type,
        onClick,
        disabled,
    } = { ...props };

    return (
        <>
            <button
                className={`w-36 flex justify-center rounded-md py-2 text-sm font-semibold leading-6 shadow-sm hover:bg-${secColor} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${secColor} bg-[${bgColor}] text-${textColor}`}
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
