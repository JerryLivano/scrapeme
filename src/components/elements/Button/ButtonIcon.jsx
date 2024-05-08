const ButtonIcon = (props) => {
    const {
        children,
        className = `-m-2.5 p-2.5 text-white hover:text-white`,
        type = 'button',
        onClick = () => {},
    } = { ...props };
    return (
        <>
            <button className={className} type={type} onClick={() => onClick()}>
                {children}
            </button>
        </>
    );
};

export default ButtonIcon;
