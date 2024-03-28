const Label = (props) => {
    const { htmlFor, children, srOnly } = { ...props };
    return (
        <>
            <label
                htmlFor={htmlFor}
                className={`block text-sm font-medium leading-6 text-gray-900 ${srOnly}`}
            >
                {children}
            </label>
        </>
    );
};

export default Label;
