import { forwardRef, useId } from "react";
import ErrorMessage from "../../layouts/ErrorMessage";

const InputCheckboxGroup = forwardRef(function InputCheckboxGroupInternal(
    {
        required = false,
        disabled = false,
        data,
        className,
        toggleSelect,
        selectedApps,
        error,
        ...props
    },
    ref
) {
    const id = useId();
    return (
        <ul className='flex flex-col gap-y-3 mt-3'>
            {data.map((item) => (
                <li key={item.id} className='flex items-center'>
                    <input
                        id={id}
                        type='checkbox'
                        disabled={disabled}
                        required={required}
                        className='h-5 w-5 text-gray-600 focus:text-gray-600 border-gray-600 rounded'
                        onClick={() =>
                            toggleSelect({ id: item.id, name: item.name })
                        }
                        checked={selectedApps.some((app) => app.id === item.id)}
                        ref={ref}
                        {...props}
                    />
                    <label
                        htmlFor={id}
                        className='ml-2 block text-md font-medium text-gray-900'
                    >
                        {item.name}
                    </label>
                </li>
            ))}
            {error && <ErrorMessage error={error} />}
        </ul>
    );
});

export default InputCheckboxGroup;
