import {
    filterFns,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { createContext, useCallback, useRef, useState } from "react";
import Spinner from "../elements/Spinner/Spinner";
import DataTablePagination from "./DataTablePagination";
import DropdownInput from "../elements/Input/DropdownInput";
import ButtonPlus from "../elements/Button/ButtonPlus";
import { Controller } from "react-hook-form";
import FilterSearchTable from "../fragments/Filter/FIlterSearchTable";
import ButtonDelete from "../elements/Button/ButtonDelete";
import MultiDropdown from "../elements/Input/MultiDropdown";
import DropdownPageInput from "../elements/Input/DropdownPageInput";
import RangeDatePickerInput from "../fragments/Filter/RangeDatePickerInput";
import Datepicker from "react-tailwindcss-datepicker";
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
    setFilterRole = () => {},
    filterApp,
    setFilterApp = () => {},
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
    handleDeleteFilteredApp = () => {},
    handleDeleteFilteredRole = () => {},
    showFilterDate = false,
    filterDate,
    setFilterDate
}) {
    const [globalFilter, setGlobalFilter] = useState("");
    const onScrollSubscriber = useRef([]);
    const tableRef = useRef(null);

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
                    <div className='flex justify-between items-center mt-6 mb-2'>
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
                                    <MultiDropdown
                                        options={filterRoleOptions}
                                        filteredOpt={filterRole}
                                        placeholder={"Roles"}
                                        setFilter={setFilterRole}
                                    />
                                </div>
                            )}
                            {/* {filterApp} */}
                            {showFilterApp && (
                                <div className='flex items-center'>
                                    <MultiDropdown
                                        options={filterAppOptions}
                                        filteredOpt={filterApp}
                                        placeholder={"Applications"}
                                        setFilter={setFilterApp}
                                    />
                                </div>
                            )}
                        </div>
                        <div className='flex items-center'>
                            {/* Date Picker */}
                            {showFilterDate ? (
                                <div className='flex items-center'>
                                    <RangeDatePickerInput
                                        className='h-full'
                                        displayFormat={"DD/MM/YYYY"}
                                        value={filterDate}
                                        onChange={setFilterDate}
                                        placeholder='Date'
                                        showFooter
                                        showShortcuts
                                    />
                                </div>
                            ): null }
                            {/* Add Button */}
                            {showAddButton && (
                                <div className='flex ml-3'>
                                    <ButtonPlus
                                        title={title}
                                        onClick={onClickAdd}
                                    />
                                </div>
                            )}
                            {/* Page Size */}
                            {showPageSize && (
                                <div className='flex flex-row ml-3 items-center'>
                                    <DropdownPageInput
                                        value={
                                            table.getState().pagination.pageSize
                                        }
                                        onChange={(e) => {
                                            setPageSize(Number(e.target.value));
                                            pageChange(0);
                                        }}
                                        className='max-w-[70px]'
                                    >
                                        {[5, 10, 15, 20, 25].map((pageSize) => (
                                            <option key={pageSize}>
                                                {pageSize}
                                            </option>
                                        ))}
                                    </DropdownPageInput>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ShowFilter */}
                    <div className='w-full inline-flex items-center py-2 bg-slate-100 mb-3 border-t-2 border-slate-200'>

                        <div className='ml-4 mr-2 text-lg'>
                            Filters
                            <span className='border-r-2 ml-3 border-black'></span>
                        </div>

                        <div className='inline-flex gap-x-1'>
                            {/* Role */}
                            <div className='inline-flex gap-x-1'>
                                {filterRole &&
                                    filterRole.length > 0 &&
                                    filterRole.map((item) => {
                                        // console.log(filterRole);
                                        return (
                                            <div
                                                key={item[0]}
                                                className='border-2 border-slate-300 inline-flex h-fit rounded-xl'
                                            >
                                                <div className='mx-4 w-full'>
                                                    {item[1]}
                                                </div>
                                                <ButtonDelete
                                                    onClick={() => {
                                                        handleDeleteFilteredRole(
                                                            item[0]
                                                        );
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                            </div>

                            {/* Application */}
                            <div className='inline-flex gap-x-1'>
                                {filterApp && 
                                    filterApp.length > 0 &&
                                    filterApp.map((item) => {
                                        return (
                                            <div className='border-2 border-slate-300 inline-flex h-fit rounded-xl'>
                                                <div className='mx-4 w-full'>
                                                    {item[1]}
                                                </div>
                                                <ButtonDelete
                                                    onClick={() => {
                                                        handleDeleteFilteredApp(
                                                            item[0]
                                                        );
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
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
                                                            className='whitespace-nowrap border-b text-gray-600 border-gray-300 bg-gray-50 px-6 py-3 text-sm font-semibold uppercase text-center'
                                                        >
                                                            {header.isPlaceholder ? null : (
                                                                <div className='flex items-center justify-center'>
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
