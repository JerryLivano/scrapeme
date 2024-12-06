import {
    filterFns,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { createContext, useCallback, useRef, useState } from "react";
import DebouncedInput from "./DebouncedInput";
import ButtonDownload from "../Button/ButtonDownload";
import { Menu } from "@headlessui/react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import Spinner from "../Spinner";
import DataTablePagination from "./DataTablePagination";
import { pluralize } from "../../../../utils/pluralizeUtilities";
import DropdownInput from "../Form/DropdownInput";

export const TableScrollEvent = createContext(null);
export const TableRef = createContext(null);

export default function MergeExportDataTable({
    data,
    columns,
    rowCount,
    title,
    onClickExport = () => {},
    showPagination = true,
    filterFn = filterFns.fuzzy,
    pageCount,
    pageSize,
    setPageSize,
    pageIndex,
    pageChange = () => {},
    searchQuery,
    searchHandler,
    columnNameHandler,
    sortHandler,
    placeholder,
    isFetching = false,
    columnVisibility,
    onColumnVisibilityChange,
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
            columnVisibility,
        },
        initialState: {
            pagination: {
                pageIndex: 1,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
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
                <main className='-mt-2 w-[50rem]'>
                    <div className='sm:flex sm:items-center'>
                        {/* title and subtitle */}
                        {title ? (
                            <div className='sm:flex-auto'>
                                <h1 className='mb-1 text-lg font-semibold leading-6'>
                                    {title}
                                </h1>
                                <p className='text-sm font-semibold text-gray-400'>{`${pluralize(
                                    rowCount,
                                    "data"
                                )}`}</p>
                            </div>
                        ) : null}
                        <span className='ml-5'>
                            <ButtonDownload onClick={onClickExport} />
                        </span>
                    </div>
                    <div className='-mb-2 mt-6 flex items-center justify-between'>
                        <div className='w-64'>
                            <FilterTable
                                value={searchQuery ?? ""}
                                setGlobalFilter={searchHandler}
                                placeholder={
                                    placeholder ? placeholder : "Search data..."
                                }
                            />
                        </div>
                        <div className='ml-3'>
                            <div className='flex flex-row items-center'>
                                <div className='mr-2 text-sm font-medium leading-6 text-gray-400'>
                                    Show Entries
                                </div>
                                <DropdownInput
                                    value={table.getState().pagination.pageSize}
                                    onChange={(e) => {
                                        setPageSize(Number(e.target.value));
                                        pageChange(0);
                                    }}
                                    className='max-w-[80px]'
                                >
                                    {[
                                        { value: 10, label: 10 },
                                        { value: 50, label: 50 },
                                        { value: 100, label: 100 },
                                        { value: 200, label: 200 },
                                        {
                                            value: rowCount,
                                            label: "All",
                                        },
                                    ].map((pageSize) => (
                                        <option
                                            key={pageSize.label}
                                            value={pageSize.value}
                                        >
                                            {pageSize.label}
                                        </option>
                                    ))}
                                </DropdownInput>
                            </div>
                        </div>
                    </div>
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
                        {/* Table Pagination */}
                        <div className='flex justify-end py-5'>
                            {showPagination ? (
                                <DataTablePagination
                                    pageIndex={pageIndex - 1}
                                    pageCount={pageCount}
                                    dataCount={rowCount}
                                    pageValue={pageSize}
                                    goToPage={pageChange}
                                    paginationLength={pageSize}
                                />
                            ) : null}
                        </div>
                    </div>
                </main>
            </TableScrollEvent.Provider>
        </TableRef.Provider>
    );
}

const FilterTable = ({ value, setGlobalFilter, placeholder }) => (
    <DebouncedInput
        value={value ?? ""}
        onChange={setGlobalFilter}
        className='w-full rounded-lg border-[#E1E3EA] p-3 pl-10 text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:border-[#E1E3EA] focus:ring-[#E1E3EA]'
        placeholder={placeholder}
    />
);
