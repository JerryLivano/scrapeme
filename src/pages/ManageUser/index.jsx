import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ProductService } from "../../services/productservice";
import useTable from "../../components/fragments/Footer/paginationtable";
import BtnAccess from "../../components/fragments/Button/BtnAccess";
import TableFooter from "../../components/fragments/Footer/tablefooter";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import FilterTable from "../../components/fragments/Filter/FilterTable";
import { GridTable, Pagination } from "../../components/fragments";
import BtnModify from "../../components/fragments/Button/BtnModify";
const header = ["", "NAME", "EMAIL", "NIK", "DEPARTMENT", "ROLE", "RECRUITME", "CVME", "TESTME", "PICKME", "BRM", "MA", "TEAMME", "MODIFY ACCESS"];
const ManageUser = ({data, rowsPerPage}) => {
    const postsPerPage = 10;
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalData, setTotalData] = useState();
    const [modifyAccess, setModifyAccess] = useState(false);
    const [openModify, setOpenModify] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    // const [postsPerPageOptions, setPostsPerPageOptions] = useState([
    //     { label: "10", value: 10 },
    //     { label: "25", value: 25 },
    //     { label: "50", value: 50 },
    //     { label: "100", value: 100 }
    //   ]);
    // const [postsPerPageSelected, setPostsPerPageSelected] = useState(
    //   postsPerPageOptions[0]
    // );
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);
  
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


    useEffect(() => {//Global Filtering
        if (searchQuery) {
          const filteredProducts = products.filter((product) =>
            Object.values(product)
              .join("")
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          setProducts(filteredProducts);
        } else {
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
    
          fetchData();
        }
      }, [searchQuery]);


    // const handleNextButton = () => {
    //     setCurrentPage(currentPage + postsPerPage);
    //     console.log(products);
    // };

    
    // const handlePostsPerPageChange = (option) => {
    //     setPostsPerPageSelected(option);
    //     setCurrentPage(0);
    // };

    return (
        <>
            {/* #region main content */}
            <div className='self-center relative'>
                <h2 className="font-bold text-4xl text-blue-500 w-full text-center mt-10">
                    Manage User
                </h2>

                <div className="mx-8 pt-20 max-w-80 inline-flex">
                    <FilterTable setSearchQuery={setSearchQuery} />
                </div>

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
        <div className="flex items-center justify-between pt-24">
        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
          {/* <div className="flex items-center">
            <span className="text-sm text-gray-700">
              Showing{" "}
              <strong>
                {currentPage * postsPerPageSelected.value + 1} to{" "}
                {
                  Math.min(
                    (currentPage + 1) * postsPerPageSelected.value,
                    totalData
                  )
                }
              </strong>{" "}
              of <strong>{totalData}</strong> results
            </span>
          </div>
          <div className="flex items-center">
            <select
              value={postsPerPageSelected.value}
              onChange={(e) =>
                handlePostsPerPageChange(
                  postsPerPageOptions.find(
                    (option) => option.value === parseInt(e.target.value)
                  )
                )
              }
              className="ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {postsPerPageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Pagination
              currentPage={
                currentPage === 0
                  ? currentPage + 1
                  : currentPage / postsPerPageSelected.value + 1
              }
              totalData={totalData}
              lastPage={totalData / postsPerPageSelected.value}
            >
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => handleNextButton()}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </a>
            </Pagination>
          </div> */}
        </div>
      </div>
            {/* #endregion */}
        </>
    );
};

export default ManageUser;