import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment, useMemo, useState } from "react";
import MergeExportDataTable from "../../Public/Table/MergeExportDataTable";
import { mergeExportExcel } from "../../../../utils/mergeExportExcel";
import uuid from "react-uuid";
import DataTable from "../../Public/Table/DataTable";

export default function FormModalMergeExportFav({ open, setOpen, scrapeData }) {
    const [selectedData, setSelectedData] = useState([]);
    const [selectedDataGuid, setSelectedDataGuid] = useState([]);

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
                            onChange={(e) => {
                                const checked = e.target.checked;

                                if (checked) {
                                    setSelectedDataGuid((prev) => [
                                        ...prev,
                                        row.guid,
                                    ]);
                                    setSelectedData((prev) => [
                                        ...prev,
                                        row.web_data,
                                    ]);
                                } else {
                                    setSelectedDataGuid((prev) => {
                                        const index = prev.findIndex(
                                            (id) => id === row.guid
                                        );
                                        const updatedDataGuid = prev.filter(
                                            (id) => id !== row.guid
                                        );
                                        setSelectedData((prevData) => {
                                            return prevData.filter(
                                                (_, idx) => idx !== index
                                            );
                                        });

                                        return updatedDataGuid;
                                    });
                                }
                            }}
                        />
                    </div>
                ),
            },
            {
                id: uuid(),
                header: "Name",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.scrape_name,
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
        ];
    }, [scrapeData]);

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
                                    {scrapeData ? (
                                        <DataTable
                                            data={scrapeData}
                                            columns={columns}
                                            rowCount={scrapeData.length || 0}
                                            title={"Export Merged Data"}
                                            showExportButton
                                            onClickExport={() =>
                                                mergeExportExcel(selectedData)
                                            }
                                        />
                                    ) : null}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
