import {
    getCoreRowModel,
    useReactTable,
    flexRender,
    getFilteredRowModel,
  } from "@tanstack/react-table";
  import React, {
    Fragment,
    MutableRefObject,
    UIEvent,
    createContext,
    useCallback,
    useRef,
    useState,
  } from "react";
//   import { FilterFns } from "../../../utils/filterFns";
//   import { pluralize } from "../../../utils/pluralize";
//   import BtnPlus from "./BtnPlus";
  import DataTablePagination from "../fragments/Pagination/DatatablePagination";
  import { ChevronDownIcon } from "@heroicons/react/20/solid";
  import { Menu, Transition } from "@headlessui/react";
  
  const DataTable = ({
    data,
    columns,
    rowCount,
    title,
    showExport = false,
    onClickExport = () => {},
    showGlobalFilter = false,
    showFilterDate = false,
    showFilterStatus = false,
    filterStatus,
    setFilterStatus,
    filterDate,
    setFilterDate,
    showAddButton = false,
    onClickAdd = () => {},
    showMailButton = false,
    onClickMail = () => {},
    showColumnVisibility = false,
    showPagination = true,
    showPageSize = true,
    // filterFn = FilterFns.fuzzy,
    pageCount,
    pageIndex,
    pageSize,
    setPageSize,
    pageChange = () => {},
    searchQuery,
    searchHandler,
    placeholder,
    isFetching = false,
    filterStatusOptions,
    columnVisibility,
    onColumnVisibilityChange,
  }) => {
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
    //   globalFilterFn: filterFn,
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
      <Fragment>
        <TableRef.Provider value={tableRef}>
          <TableScrollEvent.Provider value={contextCallback}>
            <main className="-mt-2">
              <div className="sm:flex sm:items-center">
                {/* title and subtitle */}
                {title ? (
                  <div className="sm:flex-auto">
                    <h1 className="mb-1 text-lg font-semibold leading-6 text-brm-font-black">
                      {title}
                    </h1>
                    <p className="text-sm font-semibold text-brm-font-gray">{`${pluralize(
                      rowCount,
                      title.toLowerCase()
                    )}`}</p>
                  </div>
                ) : null}
                {/* Add button */}
                {showAddButton ? (
                  <BtnPlus title={title.toLowerCase()} onClick={onClickAdd} />
                ) : null}
              </div>
              {/* <div className="-mb-2 mt-6 flex items-center justify-between"> */}
                <div className="w-96">
                  {/* search bar */}
                  {showGlobalFilter ? (
                    <FilterTable
                      value={searchQuery ?? ""}
                      setGlobalFilter={searchHandler}
                      placeholder={placeholder ? placeholder : "Search data..."}
                    />
                  ) : null}
                </div>
                <div className="flex items-center">
                  <div>
                    {/* filter date */}
                    {showFilterDate ? (
                      <div className="flex items-center">
                        <div className="mr-2 h-full text-sm font-medium text-brm-font-gray">
                          Date
                        </div>
                        <RangeDatepickerInput
                          className="z-50 h-full"
                          displayFormat={"DD/MM/YYYY"}
                          value={filterDate}
                          onChange={setFilterDate}
                          showFooter
                          showShortcuts
                          placeholder="Select Date Range"
                        />
                      </div>
                    ) : null}
                  </div>
                  <div>
                    {/* filter status */}
                    {showFilterStatus ? (
                      <div className="ml-3 flex items-center">
                        <div className="mr-2 text-sm font-medium leading-6 text-brm-font-gray">
                          Status
                        </div>
                        <DropdownInput
                          value={filterStatus}
                          onChange={setFilterStatus}
                          className="max-w-fit"
                        >
                          {filterStatusOptions.map((filterStatus) => (
                            <option
                              key={filterStatus.value}
                              value={filterStatus.value}
                            >
                              {filterStatus.label}
                            </option>
                          ))}
                        </DropdownInput>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    {/* show column visibility */}
                    {showColumnVisibility ? (
                      <Menu as="div" className="relative inline-block text-left">
                        <div className="h-[50.21px] w-[220px]">
                          <Menu.Button className="inline-flex h-full w-full items-center justify-between rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-[#7E8299] shadow-sm ring-1 ring-inset ring-[#E1E3EA] hover:bg-gray-50">
                          Column Visibility
                          <ChevronDownIcon
                            className="-mr-1 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                          <div className="px-3 py-1">
                            <Menu.Item>
                              <label className="p-1 text-sm font-medium capitalize text-brm-font-black">
                                <input
                                  {...{
                                    type: "checkbox",checked: table.getIsAllColumnsVisible(),
                                    className: "mr-1",
                                    onChange:
                                      table.getToggleAllColumnsVisibilityHandler(),
                                  }}
                                />{" "}
                                All Columns
                              </label>
                            </Menu.Item>
                            {table.getAllLeafColumns().map((column) => {
                              return (
                                <Menu.Item key={column.id}>
                                  <div className="p-1">
                                    <label className="text-sm font-medium capitalize text-brm-font-black">
                                      <input
                                        {...{
                                          type: "checkbox",
                                          checked: column.getIsVisible(),
                                          className: "mr-1",
                                          onChange:
                                            column.getToggleVisibilityHandler(),
                                        }}
                                      />{" "}
                                      {column.id}
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
                <div className="ml-3">
                  {/* Show Page Size */}
                  {showPageSize ? (
                    <div className="flex flex-row items-center">
                      <div className="mr-2 text-sm font-medium leading-6 text-brm-font-gray">
                        Show Entries
                      </div>
                      <DropdownInput
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                          setPageSize(Number(e.target.value));
                          pageChange(0);
                        }}
                        className="max-w-[70px]"
                      >
                        {[5, 10, 15, 20, 25].map((pageSize) => (
                          <option key={pageSize} value={pageSize}>
                            {pageSize}
                          </option>
                        ))}
                      </DropdownInput>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="-mx-4 -mb-2 mt-4 min-w-full overflow-hidden px-4 py-2">
                <div
                  className="w-full overflow-x-auto overflow-y-visible"
                  onScroll={(e) => {
                    onScrollSubscriber.current.forEach((x) => {
                      x(e);
                    });
                  }}
                  ref={tableRef}
                >
                  <table className="w-full">
                    {/* Table Header */}
                    <thead>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <th
                              key={header.id}
                              className="whitespace-nowrap border-b border-dashed border-[#E1E3EA] bg-gray-50 p-6 text-left text-sm font-semibold uppercase leading-4 tracking-wider text-brm-font-gray"
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    {/* Table Body */}
                    <tbody>
                      {isFetching && (
                        <tr>
                          <td
                            colSpan={table.getVisibleFlatColumns().length}
                            className="min-h-[5rem] text-center text-xl font-bold text-gray-500"
                          >
                            <Spinner />
                          </td>
                        </tr>
                      )}
                      {!isFetching && table.getRowModel().rows.length === 0 && (
                        <tr>
                          <td
                            colSpan={table.getVisibleFlatColumns().length}
                            className="h-20 text-center text-xl font-bold text-gray-500"
                          >
                            Data not found
                          </td>
                        </tr>
                      )}
                      {!isFetching &&
                        table.getRowModel().rows.map((row) => (
                          <tr key={row.id} className="bg-white">
                            {row.getVisibleCells().map((cell) => (
                              <td
                                className="whitespace-nowrap border-b border-dashed border-[#E1E3EA] p-6 text-sm font-semibold capitalize leading-5 text-brm-font-black"
                                key={cell.id}
                                // style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
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
                <div className="flex justify-end py-5">
                  {showPagination ? (
                    <DataTablePagination
                      pageIndex={pageIndex - 1}
                      pageCount={pageCount}
                      goToPage={pageChange}
                      paginationLength={5}
                    />
                  ) : null}
                </div>
              </div>
            </main>
          </TableScrollEvent.Provider>
        </TableRef.Provider>
      </Fragment>
    );
  };
    const FilterTable = ({
    value,
    setGlobalFilter,
    placeholder,
  }) => (
    <>
      <DebouncedInput
        value={value ?? ""}
        onChange={setGlobalFilter}
        className="w-full rounded-lg border-[#E1E3EA] p-3 pl-10 text-sm font-medium text-brm-font-black placeholder:text-brm-font-gray focus:border-[#E1E3EA] focus:ring-[#E1E3EA]"
        placeholder={placeholder}
      />
    </>
  );
  
  export default DataTable;