import React from "react";
import Pagination from "../Pagination";

const GridTable = ({ children, totalPages, currentPage, setCurrentPage }) => {
    return (
        <>
            <div className='px-4 sm:px-6 lg:px-8'>
                <div className='mt-8 flow-root'>
                    <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                            <table className='min-w-full divide-y divide-gray-300'>
                                {children}
                            </table>
                        </div>
                    </div>
                </div>
                <Pagination
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    );
};

export default GridTable;
