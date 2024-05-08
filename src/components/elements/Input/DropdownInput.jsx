import {
    DetailedHTMLProps,
    ReactNode,
    SelectHTMLAttributes,
    forwardRef,
    useId,
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
      ...props
    },
    ref
  ) {
      const id = useId();
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
    }
  );
  
  export default DropdownInput;