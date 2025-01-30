import { useEffect, useState } from "react";
import DebouncedInput from "../../Public/Table/DebouncedInput";
import DropdownInput from "../../Public/Form/DropdownInput";
import { useGetActiveSitesQuery } from "../../../../services/site/siteApiSlice";
import Spinner from "../../Public/Spinner";
import {
    useGetDataAnalysisQuery,
    useGetLocationComparisonQuery,
    useGetRoomComparisonQuery,
    useGetWebDataAnalysisQuery,
} from "../../../../services/scrape/scrapeApiSlice";
import { extractGuid, getAuthToken } from "../../../../utils/authUtilities";
import AvgCardList from "./AvgCardList";
import AnalysisBarChart from "./BarChart";
import WebDataAnalysisTable from "./WebDataAnalysisTable";
import AnalysisPieChart from "./PieChart";
import { pluralize } from "../../../../utils/pluralizeUtilities";

export default function DataAnalysisDashboard() {
    const [filterSite, setFilterSite] = useState("");
    const [filterSiteOptions, setFilterSiteOptions] = useState([]);
    const [search, setSearch] = useState("");
    const tokenGuid = extractGuid(getAuthToken());

    const [filterType, setFilterType] = useState("bedroom");
    const filterTypeOptions = [
        { value: "bedroom", label: "Bedroom" },
        { value: "bathroom", label: "Bathroom" },
    ];

    const [filterSort, setFilterSort] = useState("asc");
    const filterSortOptions = [
        { value: "asc", label: "Highest" },
        { value: "desc", label: "Lowest" },
    ];

    const handleSearchChange = (value) => {
        setSearch(value.toString());
    };

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

    const {
        data: dataAnalysis,
        isLoading: analysisLoading,
        isError: analysisError,
        isSuccess: analysisSuccess,
    } = useGetDataAnalysisQuery({
        account_guid: tokenGuid,
        site_guid: filterSite,
        location: search.trim(),
    });

    const {
        data: roomComparison,
        isLoading: roomLoading,
        isSuccess: roomSuccess,
        isError: roomError,
    } = useGetRoomComparisonQuery({
        account_guid: tokenGuid,
        site_guid: filterSite,
        location: search.trim(),
        room: filterType,
    });

    const {
        data: webDataAnalysis,
        isLoading: webDataLoading,
        isSuccess: webDataSuccess,
        isError: webDataError,
    } = useGetWebDataAnalysisQuery({
        account_guid: tokenGuid,
        site_guid: filterSite,
        location: search.trim(),
        order_by: filterSort,
    });

    const {
        data: locationComparison,
        isLoading: locationLoading,
        isSuccess: locationSuccess,
        isError: locationError,
    } = useGetLocationComparisonQuery({
        account_guid: tokenGuid,
        site_guid: filterSite,
    });

    const onSubmit = (data) => {
        const currentLocationData = watch("locationData") || [];
        setValue("locationData", [...currentLocationData, data.locationName]);
        setValue("locationName", "");
    };

    return (
        <>
            {sitesLoading && <Spinner />}
            {sitesSuccess && (
                <>
                    <div className='flex justify-between'>
                        <div className='w-96'>
                            <FilterTable
                                value={search}
                                setGlobalFilter={handleSearchChange}
                                placeholder={"Search location..."}
                            />
                        </div>
                        <div className='ml-3 flex items-center'>
                            <div className='mr-2 text-sm font-medium leading-6 text-gray-400'>
                                Filter Site
                            </div>
                            <DropdownInput
                                value={filterSite}
                                onChange={(e) => {
                                    setFilterSite(e.target.value);
                                }}
                                className='max-w-fit'
                            >
                                {filterSiteOptions.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </DropdownInput>
                        </div>
                    </div>
                    <div className='-mt-4 flex flex-col gap-y-3'>
                        <h1 className='text-xl font-semibold'>
                            Average Data ({analysisLoading && "0"}
                            {!analysisLoading &&
                                analysisSuccess &&
                                `${dataAnalysis.data.data_count}`}{" "}
                            {!analysisLoading &&
                                analysisSuccess &&
                                pluralize(
                                    dataAnalysis.data.data_count,
                                    "data",
                                    {
                                        onlyNoun: true,
                                    }
                                )}
                            )
                        </h1>
                        {analysisLoading && <Spinner />}
                        {!analysisLoading && analysisError && (
                            <div className='flex text-center'>
                                Failed to Get Average Data
                            </div>
                        )}
                        {!analysisLoading && analysisSuccess && (
                            <AvgCardList avgData={dataAnalysis.data} />
                        )}
                    </div>
                    <div className='flex flex-col gap-x-4 -mt-4 sm:flex-row'>
                        <div className='w-7/12 px-6 pt-4 bg-white shadow rounded-lg'>
                            <div className='flex flex-row justify-between'>
                                <div className='font-semibold text-lg flex flex-col justify-center'>
                                    Room Comparison
                                </div>
                                <div className='flex items-center'>
                                    <div className='mr-2 text-sm font-medium leading-6 text-gray-400'>
                                        Room Type
                                    </div>
                                    <DropdownInput
                                        value={filterType}
                                        onChange={(e) => {
                                            setFilterType(e.target.value);
                                        }}
                                        className='max-w-fit'
                                    >
                                        {filterTypeOptions.map((item) => (
                                            <option
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </option>
                                        ))}
                                    </DropdownInput>
                                </div>
                            </div>
                            {roomLoading && <Spinner />}
                            {!roomLoading && roomError && (
                                <div className='mt-2'>Failed to fetch data</div>
                            )}
                            {!roomLoading && roomSuccess && (
                                <div className='flex justify-center'>
                                    <AnalysisBarChart
                                        chartData={roomComparison.data}
                                    />
                                </div>
                            )}
                        </div>
                        <div className='w-5/12 px-6 pt-4 bg-white shadow rounded-lg'>
                            <div className='font-semibold text-lg flex flex-col justify-center'>
                                Most Popular Scraping Location
                            </div>
                            {locationLoading && <Spinner />}
                            {!locationLoading && locationError && (
                                <div className='mt-2'>Failed to fetch data</div>
                            )}
                            {!locationLoading && locationSuccess && (
                                <div className='mt-2 -ml-12 flex items-center justify-center'>
                                    <AnalysisPieChart
                                        chartData={locationComparison.data}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col gap-x-4 -mt-6 sm:flex-row'>
                        <div className='w-full px-6 py-4 bg-white shadow rounded-lg'>
                            <div className='flex flex-row justify-between'>
                                <div className='font-semibold text-xl flex flex-col justify-center'>
                                    Web Data Analysis
                                </div>
                                <div className='flex items-center'>
                                    <div className='mr-2 text-sm font-medium leading-6 text-gray-400'>
                                        Sort Type
                                    </div>
                                    <DropdownInput
                                        value={filterSort}
                                        onChange={(e) => {
                                            setFilterSort(e.target.value);
                                        }}
                                        className='max-w-fit'
                                    >
                                        {filterSortOptions.map((item) => (
                                            <option
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </option>
                                        ))}
                                    </DropdownInput>
                                </div>
                            </div>
                            <hr className='mt-3' />
                            <div className='flex flex-col gap-y-8 mt-4'>
                                {webDataLoading && <Spinner />}
                                {!webDataLoading && webDataError && (
                                    <div>Failed to fetch data</div>
                                )}
                                {!webDataLoading && webDataSuccess && (
                                    <>
                                        <WebDataAnalysisTable
                                            title={`Most ${
                                                filterSort === "asc"
                                                    ? "Highest"
                                                    : "Lowest"
                                            } Bedroom Data`}
                                            webData={
                                                webDataAnalysis.data
                                                    .sort_bedroom
                                            }
                                        />
                                        <WebDataAnalysisTable
                                            title={`Most ${
                                                filterSort === "asc"
                                                    ? "Highest"
                                                    : "Lowest"
                                            } Bathroom Data`}
                                            webData={
                                                webDataAnalysis.data
                                                    .sort_bathroom
                                            }
                                        />
                                        <WebDataAnalysisTable
                                            title={`Most ${
                                                filterSort === "asc"
                                                    ? "Highest"
                                                    : "Lowest"
                                            } Surface Area Data`}
                                            webData={
                                                webDataAnalysis.data
                                                    .sort_surface
                                            }
                                        />
                                        <WebDataAnalysisTable
                                            title={`Most ${
                                                filterSort === "asc"
                                                    ? "Highest"
                                                    : "Lowest"
                                            } Building Area Data`}
                                            webData={
                                                webDataAnalysis.data
                                                    .sort_building
                                            }
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
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
