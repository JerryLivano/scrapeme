import { useEffect, useState } from "react";
import axios from "axios";
import { GridTable } from "../../components/fragments";

const Dashboard = () => {
    const API_URL = "https://api.escuelajs.co/api/v1/products";
    const [data, setData] = useState([]);
    const [totalData, setTotalDta] = useState();
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);

            try {
                const page = Math.min(currentPage);
                const response = await axios.get(
                    `${API_URL}?offset=${page}&limit=10`
                );
                setData(response.data);
                const getTotalData = await axios.get(API_URL); //This might be bad practice because they call all the data at once. This can overload the system or take too long to load everything--idk
                setTotalDta(getTotalData.data.length);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        };

        fetchData();
    }, [currentPage]);

    const [open, setOpen] = useState(false);
    return (
        <>
            <>
                {/* #region main content */}
                <div className='items-center self-center relative'>
                    <GridTable
                        totalPages={totalData}
                        setCurrentPage={setCurrentPage}
                    >
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
                                    className='relative py-3.5 pl-3 pr-4 sm:pr-0'
                                >
                                    <span className='sr-only'>Edit</span>
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
                                    </tr>
                                ))}
                        </tbody>
                    </GridTable>
                </div>
                {/* #endregion */}
                {/* //#region slide over */}
                {/* <div className='float-right fixed right-5'>
                    <ChevronDoubleLeftIcon
                        className='right-0 w-8 h-8 cursor-pointer float-end'
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <SlideOvers open={open} setOpen={setOpen}>
                    <div className='px-4 py-6 mt-8 sm:px-6'>
                        <div className='flex items-start justify-between'>
                            <Title className='text-base font-semibold leading-6 text-gray-900'>
                                Panel title
                            </Title>
                            <div className='flex items-center ml-3 h-7'>
                                <ButtonIcon
                                    type='button'
                                    className='relative text-indigo-200 rounded-md hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-white'
                                    onClick={() => setOpen(false)}
                                >
                                    <span className='absolute -inset-2.5' />
                                    <span className='sr-only'>Close panel</span>
                                    <XMarkIcon
                                        className='w-6 h-6'
                                        aria-hidden='true'
                                    />
                                </ButtonIcon>
                            </div>
                        </div>
                    </div>
                    <div className='relative flex-1 px-4 mt-6 sm:px-6'>
                        {/* COntent */}
                {/* Nenek lo gaming */}
                {/* </div>
                </SlideOvers> */}{" "}
                {/* //#endregion */}
            </>
        </>
    );
};

export default Dashboard;
