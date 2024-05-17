import { forwardRef, useId } from "react";
import InputLabel from "./InputLabel";
import { useState } from "react";

const DropdownFilter = forwardRef(function DropdownInputInternal(
    {
        required = false,
        label,
        placeholder,
        children,
        className,
        error,
        disabled,
        ...props
    },
    ref
) {
  const id = useId();
  const [selectedValue, setSelectedValue] = useState(5);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedValue(selectedValue);
    if (onChange) {
      onChange(selectedValue);
    }
  };

  // useEffect(() => {
  //   // Call the function to update the table data with the selected value
  //   updateTableData(selectedValue);
  // }, [selectedValue]);

  return (
    <div className={("flex flex-col w-full", className)}>
      {label && (
        <InputLabel
          label={label}
          required={required}
          htmlFor={id}
          className="mb-2 w-full"
        />
      )}
      <select
        className=""
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

export default DropdownFilter;
