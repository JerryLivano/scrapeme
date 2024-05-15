const Button = (props) => {
    const {
        text,
        bgColor = "#5928ED",
        textColor = "white",
        type,
        onClick = () => {},
        disabled,
    } = { ...props };

    return (
        <>
            <button
                className={`w-36 flex justify-center rounded-md py-2 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-[${bgColor}] text-${textColor}`}
                type={type}
                onClick={() => onClick()}
                disabled={disabled}
            >
                {text}
            </button>
        </>
    );
};

export default Button;
