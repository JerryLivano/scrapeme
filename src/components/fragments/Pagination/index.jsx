import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";
import { UsePagination } from "../../../hoooks";

export default function Pagination({
    postsPerPage,
    currentPage,
    paginate,
    totalRows,
    totalPages,
    previousPage,
    nextPage,
    isLoading,
    rows,
    ...props
}) {
    const { page, action } = UsePagination({
        currentPage: currentPage,
        lastPage: totalPages,
        paginate: paginate,
    });
    const start =
        page.current > totalPages ? 0 : page.current * postsPerPage - 9;
    const end =
        page.current > totalPages
            ? 0
            : page.current * postsPerPage - 9 + rows - 1;

    return (
        <div className='flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6'>
            <div className='flex justify-between flex-1 items-center sm:hidden'>
                <div>
                    <p className='text-sm text-gray-700'>
                        Showing <span className='font-medium'>{start}</span> to{" "}
                        <span className='font-medium'>{end}</span> of{" "}
                        <span className='font-medium'>{totalPages}</span>{" "}
                        results
                    </p>
                </div>
                <div>
                    <button
                        className='relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
                        onClick={action.previous}
                        {...props}
                    >
                        Previous
                    </button>
                    <button
                        className='relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
                        onClick={action.next}
                        {...props}
                    >
                        Next
                    </button>
                </div>
            </div>
            <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
                <div>
                    <p className='text-sm text-gray-700'>
                        Showing <span className='font-medium'>{start}</span> to{" "}
                        <span className='font-medium'>{end}</span> of{" "}
                        <span className='font-medium'>{totalRows}</span> results
                    </p>
                </div>
                <div>
                    <nav
                        className='inline-flex -space-x-px rounded-md shadow-sm isolate'
                        aria-label='Pagination'
                    >
                        <button
                            className='relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                            onClick={action.previous}
                            {...props}
                        >
                            <span className='sr-only'>Previous</span>
                            <ChevronLeftIcon
                                className='w-5 h-5'
                                aria-hidden='true'
                            />
                        </button>

                        {page.numbers.map((number, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    action.goTo(number);
                                }}
                                aria-current='page'
                                className={
                                    parseInt(page.current) === number
                                        ? "relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-cyan-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                                        : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                }
                            >
                                {number}
                            </button>
                        ))}
                        <button
                            className='relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                            onClick={action.next}
                            {...props}
                        >
                            <span className='sr-only'>Next</span>
                            <ChevronRightIcon
                                className='w-5 h-5'
                                aria-hidden='true'
                            />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
