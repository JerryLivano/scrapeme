import { useEffect, useState } from "react";
import { GridTable } from "../../components/fragments";
import axios from "axios";

// https://dummyjson.com/products?limit=10&skip=10

const header = ["Id", "Title", "Brand", "Price"];
const HomePage = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    // total data to display
    const [postsPerPage, setPostPerPage] = useState(5); // u can change or used this if u need
    const [currentPage, setCurrentPage] = useState();

    const API_URL = "https://dummyjson.com/products";
    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            try {
                const response = await axios.get(
                    `${API_URL}?limit=${postsPerPage}&skip=0`
                );
                setData(response.data.products);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [currentPage]);
    return (
        <>
            {/* #region main content */}
            <div className='items-center self-center relative'>
                <GridTable>
                    <GridTable.Header>
                        <tr>
                            {header.map((data) => (
                                <th
                                    scope='col'
                                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                                >
                                    {data}
                                </th>
                            ))}
                        </tr>
                    </GridTable.Header>
                    <GridTable.Body>
                        {data.length > 0 &&
                            data.map((item) => (
                                <>
                                    <tr key={item.id}>
                                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                                            {item.id}
                                        </td>
                                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                                            {item.title}
                                        </td>
                                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                                            {item.brand}
                                        </td>
                                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                                            {item.price}
                                        </td>
                                    </tr>
                                </>
                            ))}
                    </GridTable.Body>
                </GridTable>
            </div>
            {/* #endregion */}
        </>
    );
};

export default HomePage;
