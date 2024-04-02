const Input = (props) => {
    const { type = 'text', placeholder, name, id, autoComplete } = { ...props };
    return (
        <>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 ring-1`}
            />
        </>
    );
};

export default Input;
