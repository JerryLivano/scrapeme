export default function ButtonIcon({ children, type, onClick }) {
    return (
        <div className="flex items-center justify-center">
            <button type={type} onClick={onClick}>
                {children}
            </button>
        </div>
    );
}
