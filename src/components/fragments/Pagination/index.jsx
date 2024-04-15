import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ setCurrentPage, currentPage, totalPages }) => {
    const handleOnClick = ({ selected }) => {
        console.log(setCurrentPage(selected));
    };
    return (
        <>
            <ReactPaginate
                breakLabel={
                    <span className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                        ...
                    </span>
                }
                nextLabel={
                    <div>
                        <div className='flex flex-1 justify-between sm:hidden'>
                            <span className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
                                Next
                            </span>
                        </div>

                        <span className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                            <span className='sr-only'>Previous</span>
                            <ChevronRightIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                            />
                        </span>
                    </div>
                }
                onPageChange={handleOnClick}
                pageRangeDisplayed={3}
                pageCount={totalPages}
                renderOnZeroPageCount={null}
                previousLabel={
                    <>
                        <div className='flex flex-1 justify-between sm:hidden'>
                            <span className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
                                Next
                            </span>
                        </div>

                        <span className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                            <span className='sr-only'>Next</span>
                            <ChevronLeftIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                            />
                        </span>
                    </>
                }
                containerClassName='flex items-center justify-center mt-8 mb-4'
                pageClassName='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                activeClassName='relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-indigo-600'
            />
        </>
    );
};

export default Pagination;
