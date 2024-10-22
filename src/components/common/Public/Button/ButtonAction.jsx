export default function ButtonAction({
    onClick,
    colorClass,
    hoverClass,
    text,
}) {
    return (
        <button
            className={`rounded ${colorClass} px-4 py-2 text-xs font-semibold text-white hover:${hoverClass}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
