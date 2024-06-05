import React, { useState } from "react";

function MultiDropdown({ options, placeholder, setFilter, filteredOpt }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='relative inline-block text-left'>
            <div>
                <button
                    type='button'
                    className='inline-flex justify-between items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                    onClick={toggleDropdown}
                >
                    {placeholder}
                    <div className="inline-flex items-center ml-3">
                        <div className="rounded-sm flex justify-center items-center font-semibold w-5 h-5 bg-gray-200 text-xs">
                            {options.length}
                        </div>
                        <svg
                            className='-mr-2 ml-1 h-5 w-5'
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
                    </div>
                </button>
            </div>
            {isOpen && (
                <div className='absolute mt-2 w-full rounded-md bg-white shadow-lg'>
                    {options.map((option) => (
                        <>
                            <div className='flex items-center py-2'>
                                <input
                                    type='checkbox'
                                    id={option.id}
                                    className='ml-2 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer'
                                    checked={filteredOpt.some((item) =>
                                        item.includes(option.id)
                                    )}
                                    onChange={() =>
                                        setFilter([option.id, option.name])
                                    }
                                />
                                <label
                                    key={option.id}
                                    className='block ml-3 text-sm text-gray-700'
                                >
                                    {option.name}
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
