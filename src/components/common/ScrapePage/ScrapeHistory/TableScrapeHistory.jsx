import { useEffect, useMemo, useState } from "react";
import {
    useDeleteScrapeMutation,
    useGetScrapeDataQuery,
} from "../../../../services/scrape/scrapeApiSlice";
import uuid from "react-uuid";
import ButtonDropdown from "../../Public/Button/ButtonDropdown";
import Spinner from "../../Public/Spinner";
import DataTable from "../../Public/Table/DataTable";
import { useGetSiteFilterQuery } from "../../../../services/site/siteApiSlice";
import ModalConfirmDelete from "../../Public/Confirmation/ModalConfirmDelete";
import { toastError, toastSuccess } from "../../Public/Toast";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

export default function TableScrapeHistory({ userGuid }) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    const [columnName, setColumnName] = useState(null);
    const [orderBy, setOrderBy] = useState(0);
    const [filterSite, setFilterSite] = useState("");
    const [filterSiteOpt, setFilterSiteOpt] = useState([
        { value: "", label: "All" },
    ]);

    const [selectedScrapeGuid, setSelectedScrapeGuid] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);

    const navigate = useNavigate();

    const {
        data: sites,
        isLoading: sitesLoading,
        isError: sitesError,
        isSuccess: sitesSuccess,
    } = useGetSiteFilterQuery();

    useEffect(() => {
        if (sites && sitesSuccess) {
            setFilterSiteOpt([
                { value: "", label: "All" },
                ...sites.data.map((site) => ({
                    value: site.guid,
                    label: site.site_name,
                })),
            ]);
        }
    }, [sites, sitesSuccess]);

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
            site_guid: filterSite,
        },
        { refetchOnMountOrArgChange: true, skip: !userGuid }
    );

    useEffect(() => {
        if (scrapeHistorySuccess && scrapeHistory) {
            setTotalPages(scrapeHistory.pagination.total_pages);
        }
    }, [scrapeHistorySuccess, scrapeHistory]);

    const [deleteScrape, { isLoading: deleteScrapeLoading }] =
        useDeleteScrapeMutation();

    const columns = useMemo(() => {
        return [
            {
                id: uuid(),
                header: "No",
                cell: (row) => row.row.index + 1,
                accessorFn: (i) => i + 1,
            },
            {
                id: uuid(),
                header: "Name",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.scrape_name,
                isSort: true,
                columnName: "scrape_name",
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
            {
                id: uuid(),
                header: "Scraping Time",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (
                    <div className='text-center'>{row.scrape_time}</div>
                ),
                isCenter: true,
            },
            {
                id: uuid(),
                header: "Date Created",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.created_date.slice(0, -4) || "",
            },
            {
                id: uuid(),
                header: "",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (
                    <ButtonDropdown
                        functionByActions={[
                            {
                                action: "See Result",
                                onFunction: () => {
                                    navigate(`/scrape/history/${row.guid}`, {
                                        state: {
                                            scrapeGuid: row.guid,
                                            scrapeName: row.scrape_name,
                                            scrapeDate: row.created_date
                                                .slice(0, -4)
                                                .replace("_", ":"),
                                        },
                                    });
                                },
                            },
                            {
                                action: "Delete",
                                onFunction: () => {
                                    setSelectedScrapeGuid(row.guid);
                                    setDeleteModal(true);
                                },
                            },
                        ]}
                    />
                ),
            },
        ];
    }, [scrapeHistory]);

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
            {scrapeHistoryLoading && sitesLoading && <Spinner />}
            {scrapeHistoryError && (
                <div className='py-5 text-center text-xl font-semibold text-gray-700'>
                    Data Not Found
                </div>
            )}
            {scrapeHistorySuccess && sitesSuccess && (
                <>
                    <DataTable
                        title={"Scrape History"}
                        rowCount={scrapeHistory.pagination.total_records}
                        data={scrapeHistory.data}
                        columns={columns}
                        showGlobalFilter
                        showPageSize
                        showPagination
                        pageIndex={scrapeHistory.pagination.current_page}
                        pageCount={totalPages}
                        pageChange={(pageIndex) =>
                            handlePageChange(pageIndex + 1)
                        }
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        searchHandler={handleSearchChange}
                        searchQuery={search}
                        placeholder={"Search scrape history name..."}
                        sortHandler={handleSort}
                        columnNameHandler={handleColumnName}
                        isFetching={scrapeHistoryFetching}
                        showExport
                        onClickExport={() => {
                            const ws = XLSX.utils.json_to_sheet([
                                {
                                    name: "John",
                                    age: 28,
                                    profession: "Developer",
                                },
                                {
                                    name: "Jane",
                                    age: 32,
                                    profession: "Designer",
                                },
                                {
                                    name: "Mike",
                                    age: 40,
                                    profession: "Manager",
                                },
                            ]);

                            const wb = XLSX.utils.book_new();
                            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

                            XLSX.writeFile(wb, `test.xlsx`);
                        }}
                        // Filter
                        showFilterSite
                        filterSite={filterSite}
                        filterSiteOptions={filterSiteOpt}
                        setFilterSite={(e) => {
                            setFilterSite(e.target.value);
                            setPage(1);
                        }}
                    />

                    <ModalConfirmDelete
                        title={"Delete Scrape History"}
                        message={
                            "Are you sure want to delete this scrape history?"
                        }
                        openModalConfirmDelete={deleteModal}
                        setOpenModalConfirmDelete={setDeleteModal}
                        isLoading={deleteScrapeLoading}
                        onDeleteHandler={async () => {
                            await deleteScrape(selectedScrapeGuid)
                                .unwrap()
                                .then(() => {
                                    toastSuccess({
                                        message: `Successfully deleted scrape history`,
                                    });
                                })
                                .catch(() => {
                                    toastError({
                                        message:
                                            "Failed to delete scrape history",
                                    });
                                });
                            setDeleteModal(false);
                        }}
                    />
                </>
            )}
        </>
    );
}
