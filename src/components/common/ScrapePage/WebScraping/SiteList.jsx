import { pluralize } from "../../../../utils/pluralizeUtilities";
import DebouncedInput from "../../Public/Table/DebouncedInput";
import ListItem from "./ListItem";
import { useState } from "react";
import { useGetActiveSitesQuery } from "../../../../services/site/siteApiSlice";
import Spinner from "../../Public/Spinner";
import ButtonDownload from "../../Public/Button/ButtonDownload";
import { useNavigate } from "react-router-dom";

export default function SiteList() {
    const [search, setSearch] = useState("");

    const handleSearchChange = (value) => {
        setSearch(value.toString());
    };

    const navigate = useNavigate();

    const {
        data: sites,
        isLoading: sitesLoading,
        isError: sitesError,
        isSuccess: sitesSuccess,
    } = useGetActiveSitesQuery(search.trim());

    return (
        <>
            {sitesLoading && <Spinner />}
            {sitesSuccess && (
                <main className='-mt-2'>
                    <div className='sm:flex sm:items-center justify-between'>
                        <div className='sm:flex-auto'>
                            <h1 className='mb-1 text-lg font-semibold leading-6'>
                                Select Scrape Site
                            </h1>
                            <p className='text-sm font-semibold text-gray-400'>{`${pluralize(
                                sites.data.length,
                                "data"
                            )}`}</p>
                        </div>
                        <div className='w-96'>
                            <FilterTable
                                value={search}
                                setGlobalFilter={handleSearchChange}
                                placeholder={"Search site data..."}
                            />
                        </div>
                    </div>
                    {sites.data.length > 0 ? (
                        <div className='grid grid-cols-2 w-full gap-x-5 gap-y-4 mt-6'>
                            {sites.data.map((item) => (
                                <ListItem
                                    key={item.guid}
                                    data={item}
                                    onClick={() => navigate(`/scrape/${item.guid}`, { state: { item } })}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className='w-full text-2xl mt-6 text-center font-semibold items-center justify-center text-gray-800'>
                            No Data Found
                        </div>
                    )}
                </main>
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
