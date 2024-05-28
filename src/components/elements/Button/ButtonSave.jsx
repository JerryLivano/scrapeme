const ButtonSave = (props) => {
    const {
        text,
        textColor = "white",
        type,
        onClick,
        disabled,
    } = { ...props };

    return (
        <>
            <button
                className={`w-36 flex justify-center rounded-md py-2 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300 bg-[#64748B] text-${textColor}`}
                type={type}
                onClick={onClick}
                disabled={disabled}
            >
                {text}
            </button>
        </>
    );
};

export default ButtonSave;
