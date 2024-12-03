import { useEffect, useMemo, useState } from "react";
import {
    useGetWebDataQuery,
    useUpdateFavWebDataMutation,
    useUpdateNoteWebDataMutation,
} from "../../../../services/scrape/scrapeApiSlice";
import uuid from "react-uuid";
import {
    LinkIcon,
    PhotoIcon,
    StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import Spinner from "../../Public/Spinner";
import DataTable from "../../Public/Table/DataTable";
import FormModalImage from "./FormModalImage";
import ButtonDropdown from "../../Public/Button/ButtonDropdown";
import FormModalNote from "./FormModalNote";
import * as XLSX from "xlsx";

export default function TableWebData({ scrapeGuid, scrapeName, scrapeDate }) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    const [imageModal, setImageModal] = useState(false);
    const [imageData, setImageData] = useState("");

    const [noteModal, setNoteModal] = useState(false);
    const [selectedScrape, setSelectedScrape] = useState({});

    const {
        data: webData,
        isLoading: webDataLoading,
        isError: webDataError,
        isSuccess: webDataSuccess,
        isFetching: webDataFetching,
    } = useGetWebDataQuery(
        {
            guid: scrapeGuid,
            page: page,
            limit: pageSize,
            search: search,
        },
        { refetchOnMountOrArgChange: true, skip: !scrapeGuid }
    );

    useEffect(() => {
        if (webData && webDataSuccess) {
            setTotalPages(webData.pagination.total_pages);
        }
    }, [webData, webDataSuccess]);

    const [updateFav] = useUpdateFavWebDataMutation();

    const columns = useMemo(() => {
        const favCols = [
            {
                id: uuid(),
                header: "",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (
                    <div className='flex justify-center items-center'>
                        {row.is_favourite ? (
                            <StarIconSolid
                                onClick={async () => {
                                    const request = {
                                        guid: scrapeGuid,
                                        index: row.index,
                                        is_favourite: !row.is_favourite,
                                    };
                                    await updateFav(request).unwrap();
                                }}
                                className='w-7 h-7 text-yellow-300 cursor-pointer'
                            />
                        ) : (
                            <StarIconOutline
                                className='w-7 h-7 text-yellow-300 cursor-pointer'
                                onClick={async () => {
                                    const request = {
                                        guid: scrapeGuid,
                                        index: row.index,
                                        is_favourite: !row.is_favourite,
                                    };
                                    await updateFav(request).unwrap();
                                }}
                            />
                        )}
                    </div>
                ),
            },
        ];

        const staticCols =
            webData && webData.data.length > 0
                ? Object.keys(webData.data[0])
                      .filter(
                          (key) =>
                              !["index", "is_favourite", "note"].includes(key)
                      )
                      .map((data) => ({
                          id: uuid(),
                          header: data,
                          cell: (row) => row.renderValue(),
                          accessorFn: (row) => {
                              if (
                                  data.toLowerCase().includes("image") &&
                                  row[data]
                              ) {
                                  return (
                                      <div className='flex justify-center'>
                                          <PhotoIcon
                                              className='text-[#17479D] w-8 h-8 cursor-pointer'
                                              onClick={() => {
                                                  setImageData(row[data]);
                                                  setImageModal(true);
                                              }}
                                          />
                                      </div>
                                  );
                              } else if (
                                  data.toLowerCase().includes("link") &&
                                  row[data]
                              ) {
                                  return (
                                      <div className='flex justify-center'>
                                          <LinkIcon
                                              className='w-6 h-6 cursor-pointer'
                                              onClick={() =>
                                                  window.open(
                                                      row[data],
                                                      "_blank"
                                                  )
                                              }
                                          />
                                      </div>
                                  );
                              }
                              return row[data];
                          },
                      }))
                : [];

        const actionCols = [
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
                                onFunction: () => {},
                            },
                        ]}
                    />
                ),
            },
        ];

        return [...favCols, ...staticCols, ...actionCols];
    }, [webData, scrapeGuid, updateFav]);

    const keysToRemove = ["is_favourite", "index"];

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
            {webDataLoading && <Spinner />}
            {webDataError && (
                <div className='py-5 text-center text-xl font-semibold text-gray-700'>
                    Data Not Found
                </div>
            )}
            {webDataSuccess && (
                <>
                    <DataTable
                        title={"Scraped Web Data"}
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
                        placeholder={"Search web data..."}
                        isFetching={webDataFetching}
                        showExport
                        onClickExport={() => {
                            const ws = XLSX.utils.json_to_sheet(
                                webData.data.map((obj) =>
                                    Object.fromEntries(
                                        Object.entries(obj).filter(
                                            ([key]) =>
                                                !keysToRemove.includes(key)
                                        )
                                    )
                                )
                            );

                            const wb = XLSX.utils.book_new();
                            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

                            XLSX.writeFile(
                                wb,
                                `${
                                    scrapeName.trim() !== ""
                                        ? scrapeName
                                        : "Scraped Data"
                                } - ${scrapeDate}.xlsx`
                            );
                        }}
                    />
                    <FormModalImage
                        open={imageModal}
                        setOpen={setImageModal}
                        imageUrl={imageData}
                    />
                    <FormModalNote
                        open={noteModal}
                        setOpen={setNoteModal}
                        guid={scrapeGuid}
                        selectedScrape={selectedScrape}
                    />
                </>
            )}
        </>
    );
}
