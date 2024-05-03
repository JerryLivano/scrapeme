import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ProductService } from "../../services/productservice";
import BtnAccess from "../../components/fragments/Button/BtnAccess";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { GridTable, Pagination } from "../../components/fragments";
import BtnModify from "../../components/fragments/Button/BtnModify";
const header = ["", "NAME", "EMAIL", "NIK", "DEPARTMENT", "ROLE", "RECRUITME", "CVME", "TESTME", "PICKME", "BRM", "MA", "TEAMME", "MODIFY ACCESS"];
const Dashboard = () => {
    const postsPerPage = 10;
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalData, setTotalData] = useState();
    const [modifyAccess, setModifyAccess] = useState(false);
    const [openModify, setOpenModify] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProductService.getProducts(
                    postsPerPage,
                    currentPage
                );
                setProducts(response.products);
                setTotalData(response.total);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchData(); // Call the function within useEffect
    }, [currentPage]);

    const handleNextButton = () => {
        setCurrentPage(currentPage + postsPerPage);
        console.log(products);
    };

    return (
        <>
            {/* #region main content */}
            <div className='self-center relative'>
                {/* #region table */}
                <GridTable>
                    <GridTable.Header>
                        <tr>
                            {header.map((data, index) => (
                                <th
                                scope="col"
                                className="px-4 py-3 text-sm font-semibold justify-content-center text-center text-gray-900 sm:pl-0"
                                key={index}
                              >
                                <div className="pl-4">{data}</div>
                              </th>
                            ))}

                        </tr>
                    </GridTable.Header>
                    <GridTable.Body>
                        {products.length > 0 &&
                            products.map((item, index) => (
                                <>
                                    <tr key={item.no}
                                    className="">
                                        <td className='whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900 sm:pl-0'>
                                            {index + 1}
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900 sm:pl-0'>
                                            {item.name}
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900 sm:pl-0'>
                                            {item.email}
                                        </td>
                                        <td className='whitespace-nowrap px-3 text-right py-4 text-sm font-medium text-gray-900 sm:pl-0'>
                                            {item.nik}
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900 sm:pl-0'>
                                            {item.department}
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 pl-2 text-center ml-2 text-sm font-medium text-gray-900 sm:pl-0'>
                                            {item.role}
                                        </td>
                                        
                                        <td className="whitespace-nowrap w-10 content text-center text-sm font-medium text-gray-900 sm:pl-0"
                                            key={index}>
                                            <BtnAccess 
                                            className={''}
                                            isModifying={!modifyAccess}/>
                                        </td>
                                        
                                        <td className="whitespace-nowrap w-10 content text-center text-sm font-medium text-gray-900 sm:pl-0"
                                            key={index}>
                                            <BtnAccess 
                                            className={''}
                                            isModifying={!modifyAccess}/>
                                        </td>
                                        
                                        <td className="whitespace-nowrap w-10 content text-center text-sm font-medium text-gray-900 sm:pl-0"
                                            key={index}>
                                            <BtnAccess 
                                            className={''}
                                            isModifying={!modifyAccess}/>
                                        </td>

                                        <td className="whitespace-nowrap w-10 content text-center text-sm font-medium text-gray-900 sm:pl-0"
                                            key={index}>
                                            <BtnAccess 
                                            className={''}
                                            isModifying={!modifyAccess}/>
                                        </td>

                                        <td className="whitespace-nowrap w-10 content text-center text-sm font-medium text-gray-900 sm:pl-0"
                                            key={index}>
                                            <BtnAccess 
                                            className={''}
                                            isModifying={!modifyAccess}/>
                                        </td>

                                        <td className="whitespace-nowrap w-10 content text-center text-sm font-medium text-gray-900 sm:pl-0"
                                            key={index}>
                                            <BtnAccess 
                                            className={''}
                                            isModifying={!modifyAccess}/>
                                        </td>
                                        
                                        <td className="whitespace-nowrap w-10 content text-center text-sm font-medium text-gray-900 sm:pl-0"
                                            key={index}>
                                            <BtnAccess 
                                            className={''}
                                            isModifying={!modifyAccess}/>
                                        </td>
                                
                                        <td className="content w-10 ml-6 mx-2 text-sm font-medium text-gray-900 sm:pl-0">
                                            <BtnModify
                                                modifyAccess={modifyAccess}
                                                setModifyAccess={setModifyAccess}
                                                openModify={openModify}
                                                setOpenModify={setOpenModify}
                                            />
                                        </td>
                
                                    </tr>
                                </>
                            ))}
                    </GridTable.Body>
                </GridTable>
                {/* #endregion table */}
                <Pagination
                    currentPage={
                        currentPage === 0
                            ? currentPage + 1
                            : currentPage / postsPerPage + 1
                    }
                    totalData={totalData}
                    lastPage={totalData / postsPerPage}
                >
                    <a
                        href='#'
                        className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        onClick={() => handleNextButton()}
                    >
                        <span className='sr-only'>Next</span>
                        <ChevronRightIcon
                            className='h-5 w-5'
                            aria-hidden='true'
                        />
                    </a>
                </Pagination>
            </div>
            {/* #endregion */}
        </>
    );
};

export default Dashboard;