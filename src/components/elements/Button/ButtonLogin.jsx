export default function ButtonLogin(props) {
    const { text, type, onClick = () => {}, disabled } = { ...props };

    return (
        <>
            <button
                className={
                    "flex justify-center w-full h-full rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-[#5928ED] text-white"
                }
                type={type}
                onClick={() => onClick()}
                disabled={disabled}
            >
                {text}
            </button>
        </>
    );
}
