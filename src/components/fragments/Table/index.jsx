import axios from "axios";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";

const Table = () => {
    //#region test display and paginate data

    const API_URL = "https://fakestoreapi.com/products";
    const itemsPerPage = 5;
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(API_URL);
                setData(response.data);
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    //#endregion
    return (
        <div className='px-4 sm:px-6 lg:px-8'>
            {isLoading ? (
                <div className='font-serif'>Loading....</div>
            ) : (
                <>
                    <div className='mt-8 flow-root'>
                        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                            <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                                <table className='min-w-full divide-y divide-gray-300'>
                                    <thead>
                                        <tr>
                                            <th
                                                scope='col'
                                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                                            >
                                                ID
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                            >
                                                Title
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                                            >
                                                Category
                                            </th>
                                            <th
                                                scope='col'
                                                className='relative py-3.5 pl-3 pr-4 sm:pr-0'
                                            >
                                                <span className='sr-only'>
                                                    Edit
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-200'>
                                        {/* Content */}
                                        {data.length > 0 &&
                                            data.map((item) => (
                                                <tr key={item.id}>
                                                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                                                        {item.id}
                                                    </td>
                                                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                                                        {item.title}
                                                    </td>
                                                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                                                        {item.price}
                                                    </td>
                                                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                                                        {item.category}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {data.length > 0 && (
                        <>
                            {/* Table content */}
                            <Pagination
                                totalPages={Math.ceil(
                                    data.length / itemsPerPage
                                )} // Calculate total pages based on data length
                                currentPage={currentPage} // Pass current page state
                                setCurrentPage={setCurrentPage} // Pass function to update current page
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Table;
