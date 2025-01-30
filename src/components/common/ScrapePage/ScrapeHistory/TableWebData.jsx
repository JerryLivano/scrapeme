import { useEffect, useMemo, useState } from "react";
import {
    useGetWebDataQuery,
    useUpdateFavWebDataMutation,
} from "../../../../services/scrape/scrapeApiSlice";
import uuid from "react-uuid";
import {
    LinkIcon,
    LinkSlashIcon,
    PhotoIcon,
    StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import Spinner from "../../Public/Spinner";
import DataTable from "../../Public/Table/DataTable";
import FormModalImage from "./FormModalImage";
import ButtonDropdown from "../../Public/Button/ButtonDropdown";
import FormModalNote from "./FormModalNote";
import { exportExcel } from "../../../../utils/exportExcel";
import { toastError } from "../../Public/Toast";
import { useNavigate } from "react-router-dom";
import FormModalDetailWebData from "./DetailWebData/FormModalDetailWebData";

export default function TableWebData({ scrapeGuid, scrapeName, scrapeDate }) {
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
            order_by: orderBy,
            column_name: columnName,
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
                ? Object.keys(
                      webData.data.reduce((maxObj, currObj) =>
                          Object.keys(currObj).length >
                          Object.keys(maxObj).length
                              ? currObj
                              : maxObj
                      )
                  )
                      .filter(
                          (key) =>
                              !["index", "is_favourite", "note"].includes(key)
                      )
                      .map((data) => ({
                          id: uuid(),
                          header: data,
                          cell: (row) => row.renderValue(),
                          accessorFn: (row) => {
                              if (data.toLowerCase().includes("image")) {
                                  return (
                                      <div className='flex justify-center'>
                                          <PhotoIcon
                                              className='text-[#17479D] w-8 h-8 cursor-pointer'
                                              onClick={() => {
                                                  setImageData(
                                                      row[data]
                                                          ? row[data]
                                                          : null
                                                  );
                                                  setImageModal(true);
                                              }}
                                          />
                                      </div>
                                  );
                              } else if (data.toLowerCase().includes("link")) {
                                  return row[data] || row[data] !== "-" ? (
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
                                  ) : (
                                      <div className='flex justify-center'>
                                          <LinkSlashIcon
                                              className='w-6 h-6 cursor-pointer'
                                              onClick={() =>
                                                  toastError({
                                                      message:
                                                          "This data doesn't have link",
                                                  })
                                              }
                                          />
                                      </div>
                                  );
                              }
                              return row[data];
                          },
                          isSort:
                              data.toLowerCase().includes("image") ||
                              data.toLowerCase().includes("link")
                                  ? false
                                  : true,
                          columnName: data,
                      }))
                      .sort((a, b) => {
                          if (a.header.toLowerCase().includes("image"))
                              return -1;
                          if (b.header.toLowerCase().includes("image"))
                              return 1;
                          if (a.header.toLowerCase().includes("link"))
                              return -1;
                          if (b.header.toLowerCase().includes("link")) return 1;
                          return 0;
                      })
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
                                onFunction: () => {
                                    setSelectedScrape(row);
                                    setDetailModal(true);
                                },
                            },
                        ]}
                    />
                ),
            },
        ];

        return [...favCols, ...staticCols, ...actionCols];
    }, [webData, scrapeGuid, updateFav]);

    const keysToRemove = ["is_favourite", "index"];

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
                        sortHandler={handleSort}
                        columnNameHandler={handleColumnName}
                        placeholder={"Search web data..."}
                        isFetching={webDataFetching}
                        showExport
                        onClickExport={() =>
                            exportExcel(
                                webData.data.map((obj) =>
                                    Object.fromEntries(
                                        Object.entries(obj).filter(
                                            ([key]) =>
                                                !keysToRemove.includes(key)
                                        )
                                    )
                                ),
                                scrapeName,
                                scrapeDate
                            )
                        }
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
