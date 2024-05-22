import React, { useState } from "react";

function MultiDropdown({ options, placeholder, setFilterApp, filteredApp }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='relative inline-block text-left'>
            <div>
                <button
                    type='button'
                    className='inline-flex justify-between w-44 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                    onClick={toggleDropdown}
                >
                    {filteredApp.length === 0
                        ? placeholder
                        : `${filteredApp.length} Apps Selected`}
                    <svg
                        className='-mr-1 ml-2 h-5 w-5'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                    >
                        <path
                            fillRule='evenodd'
                            d='M10 12.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 12.586z'
                            clipRule='evenodd'
                        />
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className='absolute mt-2 w-full rounded-md bg-white shadow-lg'>
                    {options.map((option) => (
                        <>
                            <div className='flex items-center py-2'>
                                <input
                                    type='checkbox'
                                    id={option.value}
                                    className='ml-2 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer'
                                    checked={filteredApp.includes(option.value)}
                                    onChange={() => setFilterApp(option.value)}
                                />
                                <label
                                    key={option.value}
                                    className='block ml-3 text-sm text-gray-700'
                                >
                                    {option.label}
                                </label>
                            </div>
                        </>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MultiDropdown;
