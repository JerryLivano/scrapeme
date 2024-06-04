import ModalCheckboxInput from "./ModalCheckboxInput";

export default function ModalGroupCheckboxInput({
    items,
    valueApp,
    title,
    description,
    onClick,
    isApplicationError,
}) {
    return (
        <>
            <div className='font-semibold mt-6 mb-1'>{title}</div>
            <div
                className={`${
                    isApplicationError ? "text-red-600" : "text-gray-400"
                } mb-3`}
            >
                {description}
            </div>
            <div className='flex flex-wrap gap-y-4 mb-8'>
                {items.map((item) => (
                    <ModalCheckboxInput
                        item={item}
                        valueApp={valueApp}
                        onClick={onClick}
                    />
                ))}
            </div>
        </>
    );
}
