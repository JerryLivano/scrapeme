const Button = (props) => {
    const { text, type, onClick, disabled } = { ...props };

    return (
        <>
            <button
                className={`w-36 flex justify-center rounded-md py-2 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 bg-[#5928ED] text-white`}
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
