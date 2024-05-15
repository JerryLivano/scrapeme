import {
    filterFns,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { createContext, useCallback, useRef, useState } from "react";
import FilterTable from "../fragments/Filter/FilterTable";
import Spinner from "../elements/Spinner/Spinner";

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
    setFilterApp,
    showAddButton = false,
    onClickAdd = () => {},
    showPagination = true,
    showPageSize = true,
    filterFn = filterFns.fuzzy,
    pageCount,
    pageIndex,
    pageSize,
    setPageSize,
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
                    {title && (
                        <div className='sm:flex sm:items-center mb-2'>
                            <div className='sm:flex-auto'>
                                <h1 className='text-lg font-semibold leading-6 text-brm-font-black'>
                                    {title}
                                </h1>
                            </div>
                        </div>
                    )}
                    <div className='mb-2 flex items-center'>
                        {showGlobalFilter && (
                            <div className='w-64'>
                                <FilterTable
                                    value={searchQuery ?? ""}
                                    setGlobalFilter={searchHandler}
                                    placeholder={
                                        placeholder || "Search data..."
                                    }
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
                        {/* {showPagination && (
                            <div className='flex justify-end py-5'>
                                <DataTablePagination
                                    pageIndex={pageIndex - 1}
                                    pageCount={pageCount}
                                    goToPage={pageChange}
                                    paginationLength={5}
                                />
                            </div>
                        )} */}
                    </div>
                </main>
            </TableScrollEvent.Provider>
        </TableRef.Provider>
    );
}
