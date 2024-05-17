const ButtonOutline = (props) => {
    const {
        text,
        type,
        onClick = () => {},
        disabled,
    } = { ...props };

    return (
        <>
            <button
                className={`w-36 flex justify-center rounded-md py-2 text-sm font-semibold leading-6 shadow-sm 
                bg-transparent border-2 border-[#64748B] text-[#64748B] 
                hover:bg-[#64748B] hover:text-white 
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                type={type}
                onClick={() => onClick()}
                disabled={disabled}
            >
                {text}
            </button>
        </>
    );
};

export default ButtonOutline;
