import {
    filterFns,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { createContext, useCallback, useRef } from "react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import Spinner from "../Spinner";

export const TableScrollEvent = createContext(null);
export const TableRef = createContext(null);

export default function AnalysisDataTable({
    data,
    columns,
    filterFn = filterFns.fuzzy,
    pageCount,
    pageSize,
    pageIndex,
    columnNameHandler,
    sortHandler,
    isFetching = false,
    columnVisibility,
    onColumnVisibilityChange,
}) {
    const onScrollSubscriber = useRef([]);
    const tableRef = useRef(null);

    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
        },
        initialState: {
            pagination: {
                pageIndex: 1,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
        pageCount,
        globalFilterFn: filterFn,
        onColumnVisibilityChange,
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
                <main className='-mt-12 w-full'>
                    <div className='-mx-4 -mb-2 mt-4 min-w-full overflow-hidden px-4 py-2'>
                        <div
                            className='w-full max-w-screen-2xl overflow-x-auto overflow-y-visible'
                            onScroll={(e) => {
                                onScrollSubscriber.current.forEach((x) => {
                                    x(e);
                                });
                            }}
                            ref={tableRef}
                        >
                            <table className='w-full table-auto'>
                                {/* Table Header */}
                                <thead>
                                    {table
                                        .getHeaderGroups()
                                        .map((headerGroup) => (
                                            <React.Fragment
                                                key={headerGroup.id}
                                            >
                                                <tr>
                                                    {headerGroup.headers.map(
                                                        (header) => (
                                                            <th
                                                                key={header.id}
                                                                className={`relative whitespace-nowrap border-b border-dashed border-[#E1E3EA] bg-gray-50 px-6 py-4 text-sm font-semibold ${
                                                                    header
                                                                        .column
                                                                        .columnDef
                                                                        .isCenter
                                                                        ? "text-center"
                                                                        : "text-left"
                                                                } uppercase leading-4 tracking-wider text-gray-400`}
                                                            >
                                                                <div
                                                                    className={`${
                                                                        header
                                                                            .column
                                                                            .columnDef
                                                                            .isSort &&
                                                                        "flex"
                                                                    } cursor-default items-center justify-between gap-x-4`}
                                                                >
                                                                    {flexRender(
                                                                        header
                                                                            .column
                                                                            .columnDef
                                                                            .header,
                                                                        header.getContext()
                                                                    )}
                                                                    {header
                                                                        .column
                                                                        .columnDef
                                                                        .isSort && (
                                                                        <button
                                                                            onClick={() => {
                                                                                columnNameHandler(
                                                                                    header
                                                                                        .column
                                                                                        .columnDef
                                                                                        .columnName
                                                                                );
                                                                                sortHandler();
                                                                            }}
                                                                        >
                                                                            <ArrowsUpDownIcon className='w-6' />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </th>
                                                        )
                                                    )}
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                </thead>
                                {/* Table Body */}
                                <tbody>
                                    {isFetching && (
                                        <tr>
                                            <td
                                                colSpan={
                                                    table.getVisibleFlatColumns()
                                                        .length
                                                }
                                                className='min-h-[5rem] text-center text-xl font-bold text-gray-500'
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
                                                    className='h-20 text-center text-xl font-bold text-gray-500'
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
                                                            className='whitespace-nowrap border-b border-dashed border-[#E1E3EA] px-6 py-4 text-sm font-semibold leading-5 text-gray-700'
                                                            key={cell.id}
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
                    </div>
                </main>
            </TableScrollEvent.Provider>
        </TableRef.Provider>
    );
}
