import { debounce } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function DebouncedInput({
    value: initialValue,
    onChange,
    debounceTime = 600,
    className,
    ...props
}) {
    const inputRef = useRef(null);
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    // useEffect(() => {
    //     const inputRefCurrent = inputRef.current;
    //     const timeout = setTimeout(() => {
    //         onChange(value);
    //     }, debounceTime);

    //     return () => {
    //         clearTimeout(timeout);
    //         value !== "" && inputRefCurrent?.focu
    //     }
    // })
}
