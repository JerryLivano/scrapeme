import { useMemo, useState } from "react";
import { LinkIcon, LinkSlashIcon, PhotoIcon } from "@heroicons/react/24/solid";
import ButtonDropdown from "../../Public/Button/ButtonDropdown";
import FormModalImage from "../ScrapeHistory/FormModalImage";
import FormModalNote from "../ScrapeHistory/FormModalNote";
import FormModalDetailWebData from "../ScrapeHistory/DetailWebData/FormModalDetailWebData";
import AnalysisDataTable from "../../Public/Table/AnalysisDataTable";
import uuid from "react-uuid";
import AnalysisModalNote from "./AnalysisModalNote";

export default function WebDataAnalysisTable({ title, webData }) {
    const [imageModal, setImageModal] = useState(false);
    const [imageData, setImageData] = useState("");
    const [detailModal, setDetailModal] = useState(false);

    const [noteModal, setNoteModal] = useState(false);
    const [selectedScrape, setSelectedScrape] = useState({});

    const columns = useMemo(() => {
        const staticCols =
            webData && webData.length > 0
                ? Object.keys(webData[0])
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
                              } else if (
                                  data.toLowerCase().includes("link") &&
                                  row[data]
                              ) {
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
                                              onClick={toastError({
                                                  message:
                                                      "This data doesn't have link",
                                              })}
                                          />
                                      </div>
                                  );
                              }
                              return row[data];
                          },
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
        return [...staticCols, ...actionCols];
    }, [webData]);

    return (
        <>
            <div className='font-semibold text-lg'>{title}</div>
            <AnalysisDataTable
                data={webData}
                columns={columns}
                isFetching={false}
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
    );
}
