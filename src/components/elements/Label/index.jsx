const Label = (props) => {
    const { htmlFor, name, mandatory } = { ...props };
    return (
        <>
            <label
                htmlFor={htmlFor}
                className='block text-sm font-medium leading-6 text-gray-900'
            >
                {name}
                <span hidden={!mandatory} className='text-[#E02222]'>
                    *
                </span>
            </label>
        </>
    );
};

export default Label;
