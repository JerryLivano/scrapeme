import DebouncedInput from "./DebouncedInput";

export default function FilterSearchTable({
    value,
    setGlobalFilter,
    placeholder,
}) {
    return (
        <DebouncedInput
            value={value ?? ""}
            onChange={setGlobalFilter}
            className='w-full rounded-lg border-[#E1E3EA] p-3 pl-10 text-sm font-medium focus:border-[#E1E3EA] focus:ring-[#E1E3EA]'
            placeholder={placeholder}
        />
    );
}
