const Label = (props) => {
    const { htmlFor, children, validation } = { ...props };
    return (
        <>
            <label
                htmlFor={htmlFor}
                className={`block text-sm font-medium leading-6 text-gray-900 ${validation}`}
            >
                {children}
            </label>
        </>
    );
};

export default Label;
