const ButtonText = (props) => {
    const { text, type, onClick, disabled } = { ...props };

    return (
        <>
            <button
                className={`flex justify-center text-lg rounded-md font-semibold text-[#5928ED]`}
                type={type}
                onClick={onClick}
                disabled={disabled}
            >
                {text}
            </button>
        </>
    );
};

export default ButtonText;
