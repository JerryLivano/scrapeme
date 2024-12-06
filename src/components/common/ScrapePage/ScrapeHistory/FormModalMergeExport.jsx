import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useMemo, useState } from "react";
import MergeExportDataTable from "../../Public/Table/MergeExportDataTable";
import { mergeExportExcel } from "../../../../utils/mergeExportExcel";
import uuid from "react-uuid";
import { useGetScrapeDataQuery } from "../../../../services/scrape/scrapeApiSlice";
import Spinner from "../../Public/Spinner";

export default function FormModalMergeExport({ open, setOpen, userGuid }) {
    const [selectedData, setSelectedData] = useState([]);
    const [selectedDataGuid, setSelectedDataGuid] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [columnName, setColumnName] = useState(null);
    const [orderBy, setOrderBy] = useState(0);

    const {
        data: scrapeHistory,
        isLoading: scrapeHistoryLoading,
        isError: scrapeHistoryError,
        isSuccess: scrapeHistorySuccess,
        isFetching: scrapeHistoryFetching,
    } = useGetScrapeDataQuery(
        {
            search: search.trim(),
            page: page,
            limit: pageSize,
            order_by: orderBy,
            column_name: columnName,
            account_guid: userGuid,
            site_guid: "",
        },
        { refetchOnMountOrArgChange: true, skip: !userGuid }
    );

    useEffect(() => {
        if (scrapeHistorySuccess && scrapeHistory) {
            setTotalPages(scrapeHistory.pagination.total_pages);
        }
    }, [scrapeHistorySuccess, scrapeHistory]);

    const toggleCheckbox = (guid, webData) => {
        if (!selectedDataGuid.includes(guid)) {
            setSelectedDataGuid((prev) => [...prev, guid]);
            setSelectedData((prev) => [...prev, webData]);
        } else {
            setSelectedDataGuid((prev) => prev.filter((id) => id !== guid));
            setSelectedData((prev) =>
                prev.filter((_, idx) => idx !== selectedDataGuid.indexOf(guid))
            );
        }
    };

    const columns = useMemo(() => {
        return [
            {
                id: uuid(),
                header: "",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (
                    <div className='flex items-center justify-center'>
                        <input
                            type='checkbox'
                            className='rounded w-5 h-5 shadow-sm border-gray-400 ring-transparent focus:ring-transparent cursor-pointer'
                            checked={selectedDataGuid.includes(row.guid)}
                            onChange={() =>
                                toggleCheckbox(row.guid, row.web_data)
                            }
                        />
                    </div>
                ),
            },
            {
                id: uuid(),
                header: "Name",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.scrape_name,
                isSort: true,
                columnName: "scrape_name"
            },
            {
                id: uuid(),
                header: "Site Source",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.site_name,
            },
            {
                id: uuid(),
                header: "Data Count",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (
                    <div className='text-center'>{row.data_count}</div>
                ),
                isCenter: true,
            },
        ];
    }, [scrapeHistory, selectedDataGuid]);

    const handleSort = () => {
        setOrderBy((prev) => (prev + 1) % 3);
    };

    const handleColumnName = (name) => {
        setColumnName(name);
    };

    const handlePageChange = (newPageNumber) => {
        setPage(newPageNumber);
    };

    const handleSearchChange = (value) => {
        setSearch((prev) => {
            if (value !== prev) setPage(1);
            return value.toString();
        });
    };

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-[60]'
                    onClose={() => setOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-gray-300 opacity-50 transition-opacity' />
                    </Transition.Child>
                    <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                                enterTo='opacity-100 translate-y-0 sm:scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            >
                                <Dialog.Panel className='relative overflow-visible rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:px-10'>
                                    <div className='mb-8 flex items-start justify-between rounded-t pt-3 '>
                                        <button
                                            className='float-right -mt-0.5 ml-auto border-0 text-xl font-semibold leading-none text-[#181C32] outline-none focus:outline-none'
                                            onClick={() => setOpen(false)}
                                        >
                                            <XMarkIcon className='block h-6 w-6 font-light text-[#181C32] outline-none hover:opacity-50 focus:outline-none' />
                                        </button>
                                    </div>
                                    {scrapeHistoryLoading && <Spinner />}
                                    {scrapeHistoryError && (
                                        <div className='py-5 text-center text-xl font-semibold text-gray-700'>
                                            Data Not Found
                                        </div>
                                    )}
                                    {scrapeHistorySuccess && (
                                        <MergeExportDataTable
                                            title={"Export Merged Excel Data"}
                                            rowCount={
                                                scrapeHistory.pagination
                                                    .total_records
                                            }
                                            data={scrapeHistory.data}
                                            columns={columns}
                                            pageIndex={
                                                scrapeHistory.pagination
                                                    .current_page
                                            }
                                            pageCount={totalPages}
                                            pageChange={(pageIndex) =>
                                                handlePageChange(pageIndex + 1)
                                            }
                                            pageSize={pageSize}
                                            setPageSize={setPageSize}
                                            searchHandler={handleSearchChange}
                                            searchQuery={search}
                                            placeholder={
                                                "Search by name..."
                                            }
                                            sortHandler={handleSort}
                                            columnNameHandler={handleColumnName}
                                            isFetching={scrapeHistoryFetching}
                                            onClickExport={() =>
                                                mergeExportExcel(selectedData)
                                            }
                                        />
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
