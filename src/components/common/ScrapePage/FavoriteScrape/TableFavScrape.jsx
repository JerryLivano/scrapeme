import { useEffect, useMemo, useState } from "react";
import { useGetFavScrapeDataQuery } from "../../../../services/scrape/scrapeApiSlice";
import uuid from "react-uuid";
import Spinner from "../../Public/Spinner";
import DataTable from "../../Public/Table/DataTable";
import { useGetSiteFilterQuery } from "../../../../services/site/siteApiSlice";
import { useNavigate } from "react-router-dom";
import ButtonAction from "../../Public/Button/ButtonAction";
import { mergeExportExcel } from "../../../../utils/mergeExportExcel";
import FormModalMergeExportFav from "./FormModalMergeExportFav";

export default function TableFavScrape({ userGuid }) {
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

    const [mergeExportModal, setMergeExportModal] = useState(false);

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
        data: favoriteScrape,
        isLoading: favoriteScrapeLoading,
        isError: favoriteScrapeError,
        isSuccess: favoriteScrapeSuccess,
        isFetching: favoriteScrapeFetching,
    } = useGetFavScrapeDataQuery(
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
        if (favoriteScrapeSuccess && favoriteScrape) {
            setTotalPages(favoriteScrape.pagination.total_pages);
        }
    }, [favoriteScrapeSuccess, favoriteScrape]);

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
                header: "Favorite Count",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (
                    <div className='text-center'>{row.favourite_count}</div>
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
                    <ButtonAction
                        onClick={() => {
                            navigate(`/scrape/favorite/${row.guid}`, {
                                state: {
                                    scrapeGuid: row.guid,
                                    scrapeName: row.scrape_name,
                                    scrapeDate: row.created_date
                                        .slice(0, -4)
                                        .replace("_", ":"),
                                },
                            });
                        }}
                        text={"See Result"}
                        colorClass={"bg-blue-500"}
                        hoverClass={"bg-blue-400"}
                    />
                ),
            },
        ];
    }, [favoriteScrape]);

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
            {favoriteScrapeLoading && sitesLoading && <Spinner />}
            {favoriteScrapeError && (
                <div className='py-5 text-center text-xl font-semibold text-gray-700'>
                    Data Not Found
                </div>
            )}
            {favoriteScrapeSuccess && sitesSuccess && (
                <>
                    <DataTable
                        title={"Favorite Scrape Data"}
                        rowCount={favoriteScrape.pagination.total_records}
                        data={favoriteScrape.data}
                        columns={columns}
                        showGlobalFilter
                        showPageSize
                        showPagination
                        pageIndex={favoriteScrape.pagination.current_page}
                        pageCount={totalPages}
                        pageChange={(pageIndex) =>
                            handlePageChange(pageIndex + 1)
                        }
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        searchHandler={handleSearchChange}
                        searchQuery={search}
                        placeholder={"Search favorite scrape name..."}
                        sortHandler={handleSort}
                        columnNameHandler={handleColumnName}
                        isFetching={favoriteScrapeFetching}
                        // showExport
                        // onClickExport={() => setMergeExportModal(true)}
                        // Filter
                        showFilterSite
                        filterSite={filterSite}
                        filterSiteOptions={filterSiteOpt}
                        setFilterSite={(e) => {
                            setFilterSite(e.target.value);
                            setPage(1);
                        }}
                    />

                    <FormModalMergeExportFav
                        open={mergeExportModal}
                        setOpen={setMergeExportModal}
                        scrapeData={favoriteScrape.data}
                    />
                </>
            )}
        </>
    );
}
