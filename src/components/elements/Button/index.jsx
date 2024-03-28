const Button = (...props) => {
    const {
        children,
        bgColor = `bg-[#5c6ac4]`,
        size,
        textColor = `text-white`,
        type = `submit`,
    } = { props };

    return (
        <>
            <button
                {...props}
                className={`flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${bgColor} ${size} ${textColor} ${type}`}
            >
                {children}
            </button>
        </>
    );
};

export default Button;
