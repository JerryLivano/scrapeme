import {
  DetailedHTMLProps,
  ReactNode,
  SelectHTMLAttributes,
  forwardRef,
  useId,
  useState,
  useEffect,
} from "react";
import InputLabel from "./InputLabel";

const DropdownInput = forwardRef(function DropdownInputInternal(
  {
    required = false,
    label,
    placeholder,
    children,
    className,
    error,
    disabled,
    onValueChange,
    ...props
  },
  ref
) {
  const id = useId();
  const [selectedValue, setSelectedValue] = useState(5);

  const handleChange = (e) => {
    setSelectedValue(parseInt(e.target.value));
    if (onValueChange) {
      onValueChange(parseInt(e.target.value));
    }
  };

  useEffect(() => {
    // Call the function to update the table data with the selected value
    updateTableData(selectedValue);
  }, [selectedValue]);

  return (
    <div className={("flex flex-col", className)}>
      {label && (
        <InputLabel
          label={label}
          required={required}
          htmlFor={id}
          className="mb-2"
        />
      )}
      <select
        className="border-2 rounded-md"
        ref={ref}
        {...props}
        required={required}
        disabled={disabled}
        value={selectedValue}
        onChange={handleChange}
      >
        {placeholder && (
          <option
            value=""
            disabled={required}
            hidden={required}
            className="!text-gray-400"
          >
            {placeholder}
          </option>
        )}
        {children}
      </select>
    </div>
  );
});

export default DropdownInput;