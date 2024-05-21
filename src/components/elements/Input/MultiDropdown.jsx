import React, { useState } from 'react';

function MultiDropdown({ options, placeholder, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (value) => {
        const updatedValues = [...selectedValues];
        const valueIndex = updatedValues.indexOf(value);

        if (valueIndex === -1) {
            updatedValues.push(value);
        } else {
            updatedValues.splice(valueIndex, 1);
        }

        setSelectedValues(updatedValues);
        onChange(updatedValues);
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    onClick={toggleDropdown}
                >
                    {selectedValues.length === 0 ? placeholder : `${selectedValues.length} selected`}
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 12.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 12.586z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg">
                    <div className="py-1 w-full">
                        {options.map((option) => (
                            <label
                                key={option.value}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    checked={selectedValues.includes(option.value)}
                                    onChange={() => handleCheckboxChange(option.value)}
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MultiDropdown;
