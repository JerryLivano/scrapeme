export default function ButtonAction({
    onClick,
    customPadding = false,
    colorClass,
    hoverClass,
    text,
}) {
    return (
        <button
            type='button'
            className={`rounded ${colorClass} ${
                customPadding ? customPadding : "px-4 py-2"
            } text-md font-semibold text-white hover:${hoverClass}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
