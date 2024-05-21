import React from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
import AddUser from "./AddUser";
// const header = [
//     "",
//     "NAME",
//     "EMAIL",
//     "NIK",
//     "DEPARTMENT",
//     "ROLE",
//     "RECRUITME",
//     "CVME",
//     "TESTME",
//     "PICKME",
//     "BRM",
//     "MA",
//     "TEAMME",
//     "MODIFY ACCESS",
// ];
const ManageUser = () => {
    const navigate = useNavigate();
    const HandleAddUser = () => {
        navigate("/add-user");
    };

    //     const [products, setProducts] = useState([]);
    //     const [currentPage, setCurrentPage] = useState(1);
    //     // const [totalData, setTotalData] = useState();
    //     const [postsPerPage, setPostsPerPage] = useState(10);
    //     const [modifyAccess, setModifyAccess] = useState(false);
    //     const [openModify, setOpenModify] = useState(null);
    //     const [searchQuery, setSearchQuery] = useState("");

    //     useEffect(() => {
    //         const fetchData = async () => {
    //             const response = await ProductService.getProducts();
    //             setProducts(response.products);
    //         };

    //         fetchData(); // Call the function within useEffect
    //     }, []);

    //     useEffect(() => {
    //         //Global Filtering
    //         if (searchQuery) {
    //             const filteredProducts = products.filter((product) =>
    //                 Object.values(product)
    //                     .join("")
    //                     .toLowerCase()
    //                     .includes(searchQuery.toLowerCase())
    //             );
    //             setProducts(filteredProducts);
    //         } else {
    //             const fetchData = async () => {
    //                 const response = await ProductService.getProducts();
    //                 setProducts(response.products);
    //             };

    //             fetchData();
    //         }
    //     }, [searchQuery]);

    //     return (
    //         <>
    //             {/* #region main content */}
    //             <div className='self-center relative'>
    //                 <h2 className='font-bold text-4xl text-blue-950 w-full text-center mt-10'>
    //                     Manage User
    //                 </h2>

    //                 <div className='mx-8 pt-20 flex justify-between'>
    //                     <div className='justify-start'>
    //                         <FilterTable setSearchQuery={setSearchQuery} />
    //                     </div>
    //                     <div className='justify-end'>
    //                         <DropdownInput
    //                             value={postsPerPage}
    //                             onChange={(e) => {
    //                                 setPostsPerPage(Number(e.target.value));
    //                                 setCurrentPage(0); // Reset the pageIndex to 1 when postsPerPage changes
    //                             }}
    //                             className='max-w-[70px]'
    //                         >
    //                             {[5, 10, 15, 20, 25].map((postsPerPage) => (
    //                                 <option key={postsPerPage} value={postsPerPage}>
    //                                     {postsPerPage}
    //                                 </option>
    //                             ))}
    //                         </DropdownInput>
    //                     </div>

    //                     {/* <div className="w-[70px] justify-items-end">
    //                     <select
    //                       value={postsPerPageSelected.value}
    //                       onChange={(e) =>
    //                         handlePostsPerPageChange(
    //                           postsPerPageOptions.find(
    //                             (option) => option.value === parseInt(e.target.value)
    //                           )
    //                         )
    //                       }
    //                       className="ml-2 max-h-10 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
    //                     >
    //                       {postsPerPageOptions.map((option) => (
    //                         <option key={option.value} value={option.value}>
    //                           {option.label}
    //                         </option>
    //                       ))}
    //                     </select>
    //                   </div> */}
    //                 </div>

    //                 {/* #region table */}
    //                 <GridTable>
    //                     <GridTable.Header>
    //                         <tr>
    //                             {header.map((data, index) => (
    //                                 <th
    //                                     scope='col'
    //                                     className='px-4 py-3 text-sm font-semibold justify-content-center text-center text-gray-900 sm:pl-0'
    //                                     key={index}
    //                                 >
    //                                     <div className='pl-4'>{data}</div>
    //                                 </th>
    //                             ))}
    //                         </tr>
    //                     </GridTable.Header>
    //                     <GridTable.Body>
    //                         {products.length > 0 &&
    //                             products.map((item, index) => (
    //                                 <>
    //                                     <tr key={item.no} className=''>
    //                                         <td className='whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900 sm:pl-0'>
    //                                             {index + 1}
    //                                         </td>
    //                                         <td className='whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900 sm:pl-0'>
    //                                             {item.name}
    //                                         </td>
    //                                         <td className='whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900 sm:pl-0'>
    //                                             {item.email}
    //                                         </td>
    //                                         <td className='whitespace-nowrap px-3 text-right py-4 text-sm font-medium text-gray-900 sm:pl-0'>
    //                                             {item.nik}
    //                                         </td>
    //                                         <td className='whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900 sm:pl-0'>
    //                                             {item.department}
    //                                         </td>
    //                                         <td className='whitespace-nowrap px-3 py-4 pl-2 text-center ml-2 text-sm font-medium text-gray-900 sm:pl-0'>
    //                                             {item.role}
    //                                         </td>

    //                                         <td
    //                                             className='whitespace-nowrap w-10 content text-center text-sm font-medium text-gray-900 sm:pl-0'
    //                                             key={index}
    //                                         >
    //                                             <BtnAccess
    //                                                 className={""}
    //                                                 isModifying={!modifyAccess}
    //                                             />
    //                                         </td>

    //                                         <td
    //                                             className='whitespace-nowrap w-10 content text-center text-sm font-medium text-gray-900 sm:pl-0'
    //                                             key={index}
    //                                         >
    //                                             <BtnAccess
    //                                                 className={""}
    //                                                 isModifying={!modifyAccess}
    //                                             />
    //                                         </td>

    //                                         <td
    //                                             className='whitespace-nowrap w-10 content text-center text-sm font-medium text-gray-900 sm:pl-0'
    //                                             key={index}
    //                                         >
    //                                             <BtnAccess
    //                                                 className={""}
    //                                                 isModifying={!modifyAccess}
    //                                             />
    //                                         </td>

    //                                         <td
    //                                             className='whitespace-nowrap w-10 content text-center text-sm font-medium text-gray-900 sm:pl-0'
    //                                             key={index}
    //                                         >
    //                                             <BtnAccess
    //                                                 className={""}
    //                                                 isModifying={!modifyAccess}
    //                                             />
    //                                         </td>

    //                                         <td
    //                                             className='whitespace-nowrap w-10 content text-center text-sm font-medium text-gray-900 sm:pl-0'
    //                                             key={index}
    //                                         >
    //                                             <BtnAccess
    //                                                 className={""}
    //                                                 isModifying={!modifyAccess}
    //                                             />
    //                                         </td>

    //                                         <td
    //                                             className='whitespace-nowrap w-10 content text-center text-sm font-medium text-gray-900 sm:pl-0'
    //                                             key={index}
    //                                         >
    //                                             <BtnAccess
    //                                                 className={""}
    //                                                 isModifying={!modifyAccess}
    //                                             />
    //                                         </td>

    //                                         <td
    //                                             className='whitespace-nowrap w-10 content text-center text-sm font-medium text-gray-900 sm:pl-0'
    //                                             key={index}
    //                                         >
    //                                             <BtnAccess
    //                                                 className={""}
    //                                                 isModifying={!modifyAccess}
    //                                             />
    //                                         </td>

    //                                         <td className='content w-10 ml-6 mx-2 text-sm font-medium text-gray-900 sm:pl-0'>
    //                                             <BtnModify
    //                                                 modifyAccess={modifyAccess}
    //                                                 setModifyAccess={
    //                                                     setModifyAccess
    //                                                 }
    //                                                 openModify={openModify}
    //                                                 setOpenModify={setOpenModify}
    //                                             />
    //                                         </td>
    //                                     </tr>
    //                                 </>
    //                             ))}
    //                     </GridTable.Body>
    //                 </GridTable>
    //                 {/* #endregion table */}

    //                 <div className='flex justify-end py-5'>
    //                     {/* <DataTablePagination
    //               pageIndex={pageIndex - 1}
    //               pageCount={pageCount}
    //               goToPage={handlePagination}
    //               paginationLength={5}
    //             /> */}
    //                 </div>
    //             </div>
    //             {/* #endregion */}
    //         </>
    //     );
    // };

    return (
        <>
            <div className='flex flex-col items-center mb-4'>
                <div className='text-3xl mt-4 font-semibold'>Manage User</div>
            </div>
            <div className='mt-10'>
                <UserTable />
            </div>
        </>
    );
};
export default ManageUser;
