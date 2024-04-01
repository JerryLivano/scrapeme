const Button = (props) => {
    const {
        children,
        bgColor = 'bg-[#5c6ac4]',
        size,
        textColor = 'text-white',
        type = 'button',
        onClick = () => {},
    } = { ...props };

    return (
        <>
            <button
                className={`flex justify-center w-full h-full rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${bgColor} ${size} ${textColor}`}
                type={type}
                onClick={() => onClick()}
            >
                {children}
            </button>
        </>
    );
};

export default Button;
