import {
    filterFns,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { createContext, useCallback, useRef, useState } from "react";
import FilterTable from "../fragments/Filter/FilterTable";
import { MultiSelect } from "primereact/multiselect";
import Spinner from "../elements/Spinner/Spinner";
import DataTablePagination from "./DataTablePagination";
import { useGetApplicationQuery } from "../../services/applicationApiSlice";
import DropdownInput from "../elements/Input/DropdownInput";
import ButtonPlus from "../elements/Button/ButtonPlus";
import FilterSearchTable from "../fragments/Filter/FIlterSearchTable";
import { useForm } from "react-hook-form";
import { Select } from "@mui/material";

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

    {
        appIsSuccess && console.log("apps.data:", apps.data);
    }

    console.log(filterRoleOptions)

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
                        <div className='flex items-center'>
                            {showGlobalFilter && (
                                <div className='w-fit mr-2'>
                                    <FilterSearchTable
                                        value={searchQuery ?? ""}
                                        setGlobalFilter={searchHandler}
                                        placeholder={
                                            placeholder
                                                ? placeholder
                                                : "Search Data..."
                                        }
                                    />
                                </div>
                            )}
                            {/* {filterRole} */}
                            {showFilterRole && (
                                <div className='flex items-center'>
                                    <DropdownInput
                                        value={filterRole}
                                        onChange={setFilterRole}
                                        className='max-w-fit'
                                    >
                                        {filterRoleOptions.map(
                                            (filterRole) => (
                                                <option
                                                    key={
                                                        filterRole.value
                                                    }
                                                    value={
                                                        filterRole.value
                                                    }
                                                >
                                                    {filterRole.label}
                                                </option>
                                            )
                                        )}
                                    </DropdownInput>
                                </div>
                            )}
                            {/* {filterApp} */}
                            {filterApp && (
                                <div className='card justify-center ml-2'>
                                    <MultiSelect
                                        options={appIsSuccess ? apps.data : []}
                                        optionLabel='appName'
                                        placeholder='--- Select Apps ---'
                                        value={selectedApps}
                                        onChange={(e) => {
                                            setSelectedApps(e.value);
                                            setValue(
                                                "appId",
                                                e.value.map((app) => app.id)
                                            );
                                        }}
                                        className='w-full max-w-60 text-center border-2 rounded-sm h-10 justify-center flex'
                                        panelClassName='text-black bg-white border-2 rounded-md text-center overflow-y-hidden'
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
