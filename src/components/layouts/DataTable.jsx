import {
    filterFns,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { createContext, useCallback, useRef, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import Spinner from "../elements/Spinner/Spinner";
import DataTablePagination from "./DataTablePagination";
import { useGetApplicationQuery } from "../../services/applicationApiSlice";
import {
    useGetRoleByIdQuery,
    useGetRoleQuery,
} from "../../services/roleApi.Slice";
import DropdownInput from "../elements/Input/DropdownInput";
import ButtonPlus from "../elements/Button/ButtonPlus";
import { useForm } from "react-hook-form";
import { Select } from "@mui/material";
import FilterSearchTable from "../fragments/Filter/FIlterSearchTable";
import ButtonDelete from "../elements/Button/ButtonDelete";
import MultiDropdown from "../elements/Input/MultiDropdown";

export const TableScrollEvent = createContext(null);
export const TableRef = createContext(null);

export default function DataTable({
    data,
    columns,
    rowCount,
    title,
    showGlobalFilter = false,
    showFilterRole = false,
    showFilterApp = false,
    filterRole,
    setFilterRole,
    filterApp,
    role,
    setFilterApp,
    showAddButton = false,
    onClickAdd = () => {},
    showPagination = false,
    showPageSize = false,
    showTitle = false,
    filterFn = filterFns.fuzzy,
    pageCount,
    pageIndex,
    pageSize,
    setPageSize,
    dataRecord,
    pageChange = () => {},
    searchQuery,
    searchHandler,
    placeholder,
    isFetching = false,
    filterRoleOptions,
    filterAppOptions,
}) {
    const [globalFilter, setGlobalFilter] = useState("");
    const onScrollSubscriber = useRef([]);
    const tableRef = useRef(null);
    const [page, setPage] = useState(1);
    const [selectedApps, setSelectedApps] = useState("");

    const {
        data: apps,
        isLoading: appIsLoading,
        isSuccess: appIsSuccess,
        isFetching: appIsFetching,
    } = useGetApplicationQuery({ page: page, limit: pageSize });

    const { setValue, watch } = useForm({
        defaultValues: {
            roleId: "",
            roleName: "",
            appId: "",
            appName: "",
        },
        mode: "onChange",
    });

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        initialState: {
            pagination: {
                pageIndex: 1,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        manualPagination: true,
        pageCount,
        globalFilterFn: filterFn,
    });

    const contextCallback = useCallback((f) => {
        onScrollSubscriber.current.push(f);
        return () => {
            onScrollSubscriber.current = onScrollSubscriber.current.filter(
                (elem) => elem !== f
            );
        };
    }, []);

    const handleDeleteFilterRole = () => {
        setFilterRole("s"); // Clear the selected filter role
    };

    console.log(handleDeleteFilterRole)
    console.log(MultiDropdown)
    console.log(setFilterRole)

    return (
        <TableRef.Provider value={tableRef}>
            <TableScrollEvent.Provider value={contextCallback}>
                <main>
                    {title && showTitle && (
                        <div className='sm:flex sm:items-center mb-4'>
                            <div className='sm:flex-auto'>
                                <h1 className='text-lg font-semibold leading-6 text-brm-font-black'>
                                    {title}
                                </h1>
                            </div>
                        </div>
                    )}
                    <div className='flex justify-between items-center w-full mb-2'>
                        {/* Search */}
                        <div className='flex items-center'>
                            {showGlobalFilter && (
                                <div className='w-fit mr-2'>
                                    <FilterSearchTable
                                        value={searchQuery ?? ""}
                                        setGlobalFilter={searchHandler}
                                        placeholder={
                                            placeholder || "Search data..."
                                        }
                                    />
                                </div>
                            )}
                            {/* {filterRole} */}
                            {showFilterRole && (
                                <div className='flex items-center mr-2'>
                                    <DropdownInput
                                        value={filterRole}
                                        onChange={setFilterRole}
                                        className='max-w-fit'
                                    >
                                        {filterRoleOptions.map((filterRole) => (
                                            <option
                                                key={filterRole.value}
                                                value={filterRole.value}
                                            >
                                                {filterRole.label}
                                            </option>
                                        ))}
                                    </DropdownInput>
                                </div>
                            )}
                            {/* {filterApp} */}
                            {filterApp && (
                                <div className="">
                                    <MultiDropdown
                                        options={appIsSuccess ? apps.data : []}
                                        optionLabel='name'
                                        placeholder='--- Select Apps ---'
                                        value={selectedApps}
                                        onChange={(e) => {
                                            setSelectedApps(e.value);
                                            setValue(
                                                "appId",
                                                e.value.map((app) => app.id)
                                            );
                                        }}
                                        className='w-44 text-center border-2 rounded-sm px-4 h-10 pt-2 flex color:red'
                                        // panelClassName='w-fit text-black bg-white border-2 px-4 rounded-md'
                                        // itemTemplate={(option) => (
                                        //     <div className='inline-flex bg-transparent border-none mx-3'>
                                        //         {option.name}
                                        //     </div>
                                        // )}
                                    />
                                </div>
                            )}
                        </div>
                        <div className='flex items-center'>
                            <div className='flex ml-3'>
                                {/* Add Button */}
                                {showAddButton && (
                                    <span className='mr-3'>
                                        <ButtonPlus
                                            title={title}
                                            onClick={onClickAdd}
                                        />
                                    </span>
                                )}
                                {/* Page Size */}
                                {showPageSize && (
                                    <div className='flex flex-row items-center'>
                                        <DropdownInput
                                            value={
                                                table.getState().pagination
                                                    .pageSize
                                            }
                                            onChange={(e) => {
                                                setPageSize(
                                                    Number(e.target.value)
                                                );
                                                pageChange(0);
                                            }}
                                            className='max-w-[70px]'
                                        >
                                            {[5, 10, 15, 20, 25].map(
                                                (pageSize) => (
                                                    <option key={pageSize}>
                                                        {pageSize}
                                                    </option>
                                                )
                                            )}
                                        </DropdownInput>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* {{ShowFilter}} */}
                    <div className="w-full inline-flex h-10 bg-slate-100 mb-3 border-t-2 border-slate-200">
                        <div className="ml-4 mr-2 mt-1">
                            Filters
                            <span className="border-r-2 ml-3 border-black"></span>
                        </div>
                        {filterRole && (
                            <div className="border-2 mx-2 mt-1 border-slate-200 inline-flex h-fit rounded-xl">
                                <div className="mx-3 w-full">
                                    {filterRoleOptions.find(option => option.value === filterRole)?.value}
                                </div>
                                <ButtonDelete 
                                    // setFilterRole={setFilterRole}
                                    onClick={handleDeleteFilterRole}
                                />
                            </div>
                        )}
                    </div>
                    <div className='min-w-full overflow-hidden'>
                        <div
                            className='w-full overflow-x-auto overflow-y-visible'
                            onScroll={(e) => {
                                onScrollSubscriber.current.forEach((x) => {
                                    x(e);
                                });
                            }}
                            ref={tableRef}
                        >
                            <table className='w-full border border-gray-300'>
                                <thead>
                                    {table
                                        .getHeaderGroups()
                                        .map((headerGroup, index) => (
                                            <tr key={index}>
                                                {headerGroup.headers.map(
                                                    (header) => (
                                                        <th
                                                            key={header.id}
                                                            className='whitespace-nowrap border-b text-gray-600 border-gray-300 bg-gray-50 px-6 py-3 text-left text-sm font-semibold uppercase'
                                                        >
                                                            {header.isPlaceholder ? null : (
                                                                <div className='flex items-center justify-between'>
                                                                    {flexRender(
                                                                        header
                                                                            .column
                                                                            .columnDef
                                                                            .header,
                                                                        header.getContext()
                                                                    )}
                                                                </div>
                                                            )}
                                                        </th>
                                                    )
                                                )}
                                            </tr>
                                        ))}
                                </thead>
                                <tbody>
                                    {isFetching && (
                                        <tr>
                                            <td
                                                colSpan={
                                                    table.getVisibleFlatColumns()
                                                        .length
                                                }
                                                className='py-6 text-center text-xl font-bold text-gray-500'
                                            >
                                                <Spinner />
                                            </td>
                                        </tr>
                                    )}
                                    {!isFetching &&
                                        table.getRowModel().rows.length ===
                                            0 && (
                                            <tr>
                                                <td
                                                    colSpan={
                                                        table.getVisibleFlatColumns()
                                                            .length
                                                    }
                                                    className='py-6 text-center text-xl font-bold text-gray-500'
                                                >
                                                    Data not found
                                                </td>
                                            </tr>
                                        )}
                                    {!isFetching &&
                                        table.getRowModel().rows.map((row) => (
                                            <tr
                                                key={row.id}
                                                className='bg-white'
                                            >
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => (
                                                        <td
                                                            key={cell.id}
                                                            className={`whitespace-nowrap border-b ${
                                                                cell.column
                                                                    .columnDef
                                                                    .isBlack
                                                                    ? ""
                                                                    : "text-gray-600"
                                                            } border-gray-300 px-6 py-4 text-sm`}
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </td>
                                                    ))}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        {showPagination && (
                            <div className='flex justify-end py-5'>
                                <DataTablePagination
                                    pageIndex={pageIndex - 1}
                                    pageCount={pageCount}
                                    dataCount={rowCount}
                                    pageValue={pageSize}
                                    goToPage={pageChange}
                                    paginationLength={5}
                                />
                            </div>
                        )}
                    </div>
                </main>
            </TableScrollEvent.Provider>
        </TableRef.Provider>
    );
}
