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
import ButtonAdd from "../Button/ButtonAdd";
import DropdownInput from "../Form/DropdownInput";

export const TableScrollEvent = createContext(null);
export const TableRef = createContext(null);

export default function DataTable({
    data,
    columns,
    rowCount,
    title,
    showExport = false,
    onClickExport = () => {},
    showGlobalFilter = false,
    showFilterDate = false,
    filterDate,
    setFilterDate,
    showAddButton = false,
    onClickAdd = () => {},
    showColumnVisibility,
    showPagination = true,
    showPageSize = true,
    filterFn = filterFns.fuzzy,
    pageCount,
    pageSize,
    pageIndex,
    setPageSize,
    pageChange = () => {},
    searchQuery,
    searchHandler,
    columnNameHandler,
    sortHandler,
    placeholder,
    // Custom filter
    showFilterStatus,
    filterStatus,
    filterStatusOptions,
    setFilterStatus,
    showFilterRole,
    filterRole,
    filterRoleOptions,
    setFilterRole,
    // Here
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
                <main className='-mt-2'>
                    <div className='sm:flex sm:items-center'>
                        {/* title and subtitle */}
                        {title ? (
                            <div className='sm:flex-auto'>
                                <h1 className='mb-1 text-lg font-semibold leading-6 text-brm-font-black'>
                                    {title}
                                </h1>
                                <p className='text-sm font-semibold text-gray-400'>{`${pluralize(
                                    rowCount,
                                    "data"
                                )}`}</p>
                            </div>
                        ) : null}
                        {/* Add button */}
                        {showAddButton ? (
                            <span className='ml-5'>
                                <ButtonAdd
                                    title={`Add ${title.toLowerCase()}`}
                                    onClick={onClickAdd}
                                />
                            </span>
                        ) : null}
                        {/* export button */}
                        {showExport ? (
                            <span className='ml-5'>
                                <ButtonDownload onClick={onClickExport} />
                            </span>
                        ) : null}
                    </div>
                    <div className='-mb-2 mt-6 flex items-center justify-between'>
                        <div className='w-96'>
                            {/* search bar */}
                            {showGlobalFilter ? (
                                <FilterTable
                                    value={searchQuery ?? ""}
                                    setGlobalFilter={searchHandler}
                                    placeholder={
                                        placeholder
                                            ? placeholder
                                            : "Search data..."
                                    }
                                />
                            ) : null}
                        </div>
                        <div className='flex items-center'>
                            <div>
                                {/* filter date */}
                                {showFilterDate ? (
                                    <div className='flex items-center'>
                                        <div className='mr-2 h-full text-sm font-medium text-gray-400'>
                                            Date
                                        </div>
                                        {/* <RangeDatepickerInput
                                            className='h-full'
                                            displayFormat={"DD/MM/YYYY"}
                                            value={filterDate}
                                            onChange={setFilterDate}
                                            showFooter
                                            showShortcuts
                                            placeholder='Select Date Range'
                                        /> */}
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                {/* filter role */}
                                {showFilterRole ? (
                                    <div className='ml-3 flex items-center'>
                                        <div className='mr-2 text-sm font-medium leading-6 text-gray-400'>
                                            Role
                                        </div>
                                        <DropdownInput
                                            value={filterRole}
                                            onChange={setFilterRole}
                                            className='max-w-fit'
                                        >
                                            {filterRoleOptions.map((item) => (
                                                <option
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </option>
                                            ))}
                                        </DropdownInput>
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                {/* filter status */}
                                {showFilterStatus ? (
                                    <div className='ml-3 flex items-center'>
                                        <div className='mr-2 text-sm font-medium leading-6 text-gray-400'>
                                            Status
                                        </div>
                                        <DropdownInput
                                            value={filterStatus}
                                            onChange={setFilterStatus}
                                            className='max-w-fit'
                                        >
                                            {filterStatusOptions.map((item) => (
                                                <option
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </option>
                                            ))}
                                        </DropdownInput>
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                {/* show column visibility */}
                                {showColumnVisibility ? (
                                    <Menu
                                        as='div'
                                        className='relative inline-block text-left'
                                    >
                                        <div className='h-[50.21px] w-[220px]'>
                                            <Menu.Button className='inline-flex h-full w-full items-center justify-between rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-[#7E8299] shadow-sm ring-1 ring-inset ring-[#E1E3EA] hover:bg-gray-50'>
                                                Column Visibility
                                                <ChevronDownIcon
                                                    className='-mr-1 h-5 w-5 text-gray-400'
                                                    aria-hidden='true'
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter='transition ease-out duration-100'
                                            enterFrom='transform opacity-0 scale-95'
                                            enterTo='transform opacity-100 scale-100'
                                            leave='transition ease-in duration-75'
                                            leaveFrom='transform opacity-100 scale-100'
                                            leaveTo='transform opacity-0 scale-95'
                                        >
                                            <Menu.Items className='absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
                                                <div className='px-3 py-1'>
                                                    <Menu.Item>
                                                        <label className='p-1 text-sm font-medium capitalize text-brm-font-black'>
                                                            <input
                                                                {...{
                                                                    type: "checkbox",
                                                                    checked:
                                                                        table.getIsAllColumnsVisible(),
                                                                    className:
                                                                        "mr-1",
                                                                    onChange:
                                                                        table.getToggleAllColumnsVisibilityHandler(),
                                                                }}
                                                            />{" "}
                                                            All Columns
                                                        </label>
                                                    </Menu.Item>
                                                    {table
                                                        .getAllLeafColumns()
                                                        .map((column) => {
                                                            return (
                                                                <Menu.Item
                                                                    key={
                                                                        column.id
                                                                    }
                                                                >
                                                                    <div className='p-1'>
                                                                        <label className='text-sm font-medium capitalize text-gray-700'>
                                                                            <input
                                                                                {...{
                                                                                    type: "checkbox",
                                                                                    checked:
                                                                                        column.getIsVisible(),
                                                                                    className:
                                                                                        "mr-1",
                                                                                    onChange:
                                                                                        column.getToggleVisibilityHandler(),
                                                                                }}
                                                                            />{" "}
                                                                            {
                                                                                column.id
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                </Menu.Item>
                                                            );
                                                        })}
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                ) : null}
                            </div>
                            <div className='ml-3'>
                                {/* Show Page Size */}
                                {showPageSize ? (
                                    <div className='flex flex-row items-center'>
                                        <div className='mr-2 text-sm font-medium leading-6 text-gray-400'>
                                            Show Entries
                                        </div>
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
                                            className='max-w-[80px]'
                                        >
                                            {[50, 100, 150, 200, 250].map(
                                                (pageSize) => (
                                                    <option
                                                        key={pageSize}
                                                        value={pageSize}
                                                    >
                                                        {pageSize}
                                                    </option>
                                                )
                                            )}
                                        </DropdownInput>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className='-mx-4 -mb-2 mt-4 min-w-full overflow-hidden px-4 py-2'>
                        <div
                            className='w-full overflow-x-auto overflow-y-visible'
                            onScroll={(e) => {
                                onScrollSubscriber.current.forEach((x) => {
                                    x(e);
                                });
                            }}
                            ref={tableRef}
                        >
                            <table className='w-full'>
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
