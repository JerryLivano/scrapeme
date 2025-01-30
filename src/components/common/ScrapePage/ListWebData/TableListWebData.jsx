import { useEffect, useMemo, useState } from "react";
import {
    useGetAllListWebDataQuery,
    useUpdateFavWebDataMutation,
} from "../../../../services/scrape/scrapeApiSlice";
import { extractGuid, getAuthToken } from "../../../../utils/authUtilities";
import uuid from "react-uuid";
import {
    LinkIcon,
    LinkSlashIcon,
    PhotoIcon,
    StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import ButtonDropdown from "../../Public/Button/ButtonDropdown";
import Spinner from "../../Public/Spinner";
import DataTable from "../../Public/Table/DataTable";
import FormModalImage from "../ScrapeHistory/FormModalImage";
import AnalysisModalNote from "../DataAnalysis/AnalysisModalNote";
import FormModalDetailWebData from "../ScrapeHistory/DetailWebData/FormModalDetailWebData";
import { useGetActiveSitesQuery } from "../../../../services/site/siteApiSlice";
import { toastError } from "../../Public/Toast";

export default function TableListWebData() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [columnName, setColumnName] = useState(null);
    const [orderBy, setOrderBy] = useState(0);

    const [imageModal, setImageModal] = useState(false);
    const [imageData, setImageData] = useState("");
    const [detailModal, setDetailModal] = useState(false);

    const [noteModal, setNoteModal] = useState(false);
    const [selectedScrape, setSelectedScrape] = useState({});

    const [filterSite, setFilterSite] = useState("");
    const [filterSiteOptions, setFilterSiteOptions] = useState([]);

    const [filterBedroom, setFilterBedroom] = useState(-1);
    const filterBedroomOptions = [{ value: -1, label: "All" }];

    const [filterBathroom, setFilterBathroom] = useState(-1);
    const filterBathroomOptions = [{ value: -1, label: "All" }];

    for (let i = 0; i <= 100; i++) {
        filterBedroomOptions.push({ value: i, label: i });
        filterBathroomOptions.push({ value: i, label: i });
    }

    const {
        data: webData,
        isLoading: webDataLoading,
        isError: webDataError,
        isSuccess: webDataSuccess,
        isFetching: webDataFetching,
    } = useGetAllListWebDataQuery(
        {
            account_guid: extractGuid(getAuthToken()),
            site_guid: filterSite,
            page: page,
            limit: pageSize,
            search: search,
            order_by: orderBy,
            column_name: columnName,
            bedroom: filterBedroom,
            bathroom: filterBathroom,
        },
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (webData && webDataSuccess) {
            setTotalPages(webData.pagination.total_pages);
        }
    }, [webData, webDataSuccess]);

    const {
        data: sites,
        isLoading: sitesLoading,
        isError: sitesError,
        isSuccess: sitesSuccess,
    } = useGetActiveSitesQuery("");

    useEffect(() => {
        if (sitesSuccess) {
            setFilterSiteOptions([
                { value: "", label: "All" },
                ...sites.data.map((site) => ({
                    value: site.guid,
                    label: site.site_name,
                })),
            ]);
        }
    }, [sites, sitesSuccess]);

    const columns = useMemo(
        () => [
            {
                id: uuid(),
                header: "",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (
                    <div className='flex justify-center items-center'>
                        {row.is_fav ? (
                            <StarIconSolid className='w-7 h-7 text-yellow-300' />
                        ) : (
                            <StarIconOutline className='w-7 h-7 text-yellow-300' />
                        )}
                    </div>
                ),
            },
            {
                id: uuid(),
                header: "Image",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (
                    <div className='flex justify-center'>
                        <PhotoIcon
                            className='text-[#17479D] w-8 h-8 cursor-pointer'
                            onClick={() => {
                                setImageData(
                                    row.image && row.image !== "-"
                                        ? row.image
                                        : null
                                );
                                setImageModal(true);
                            }}
                        />
                    </div>
                ),
            },
            {
                id: uuid(),
                header: "Link",
                cell: (row) => row.renderValue(),
                accessorFn: (row) =>
                    row.link && row.link !== "-" ? (
                        <div className='flex justify-center'>
                            <LinkIcon
                                className='w-6 h-6 cursor-pointer'
                                onClick={() => window.open(row.link, "_blank")}
                            />
                        </div>
                    ) : (
                        <div className='flex justify-center'>
                            <LinkSlashIcon
                                className='w-6 h-6 cursor-pointer'
                                onClick={() =>
                                    toastError({
                                        message: "This data doesn't have link",
                                    })
                                }
                            />
                        </div>
                    ),
            },
            {
                id: uuid(),
                header: "Name",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.name,
                isSort: true,
                columnName: "name",
            },
            {
                id: uuid(),
                header: "Type",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.type,
                isSort: true,
                columnName: "type",
            },
            {
                id: uuid(),
                header: "Location",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.location,
                isSort: true,
                columnName: "location",
            },
            {
                id: uuid(),
                header: "Price",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.price,
                isSort: true,
                columnName: "price",
            },
            {
                id: uuid(),
                header: "Bedroom",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.bedroom,
                isSort: true,
                columnName: "bedroom",
            },
            {
                id: uuid(),
                header: "Bathroom",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.bathroom,
                isSort: true,
                columnName: "bathroom",
            },
            {
                id: uuid(),
                header: "Building",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.building,
                isSort: true,
                columnName: "building",
            },
            {
                id: uuid(),
                header: "Surface",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.surface,
                isSort: true,
                columnName: "surface",
            },
            {
                id: uuid(),
                header: "",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (
                    <ButtonDropdown
                        functionByActions={[
                            {
                                action: "Note",
                                onFunction: () => {
                                    setSelectedScrape(row);
                                    setNoteModal(true);
                                },
                            },
                            {
                                action: "View Detail",
                                onFunction: () => {
                                    setSelectedScrape(row);
                                    setDetailModal(true);
                                },
                            },
                        ]}
                    />
                ),
            },
        ],
        [webData]
    );

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
            {webDataLoading && sitesLoading && <Spinner />}
            {webDataError && (
                <div className='py-5 text-center text-xl font-semibold text-gray-700'>
                    Data Not Found
                </div>
            )}
            {webDataSuccess && sitesSuccess && (
                <>
                    <DataTable
                        title={"List All Web Data"}
                        rowCount={webData.pagination.total_records}
                        data={webData.data}
                        columns={columns}
                        showGlobalFilter
                        showPageSize
                        showPagination
                        pageIndex={webData.pagination.current_page}
                        pageCount={totalPages}
                        pageChange={(pageIndex) =>
                            handlePageChange(pageIndex + 1)
                        }
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        searchHandler={handleSearchChange}
                        searchQuery={search}
                        sortHandler={handleSort}
                        columnNameHandler={handleColumnName}
                        placeholder={"Search web data..."}
                        isFetching={webDataFetching}
                        showFilterSite
                        filterSite={filterSite}
                        setFilterSite={(e) => setFilterSite(e.target.value)}
                        filterSiteOptions={filterSiteOptions}
                        showFilterBedroom
                        filterBedroom={filterBedroom}
                        setFilterBedroom={(e) =>
                            setFilterBedroom(e.target.value)
                        }
                        filterBedroomOptions={filterBedroomOptions}
                        showFilterBathroom
                        filterBathroom={filterBathroom}
                        setFilterBathroom={(e) =>
                            setFilterBathroom(e.target.value)
                        }
                        filterBathroomOptions={filterBathroomOptions}
                    />
                    <FormModalImage
                        open={imageModal}
                        setOpen={setImageModal}
                        imageUrl={imageData}
                    />
                    <AnalysisModalNote
                        open={noteModal}
                        setOpen={setNoteModal}
                        selectedScrape={selectedScrape}
                    />
                    <FormModalDetailWebData
                        open={detailModal}
                        setOpen={setDetailModal}
                        webData={selectedScrape}
                    />
                </>
            )}
        </>
    );
}
