import { faBath, faBed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function FormModalDetailWebData({ open, setOpen, webData }) {
    const imageKey = Object.keys(webData).filter((key) =>
        key.toLowerCase().includes("image")
    );
    const nameKey = Object.keys(webData).filter((key) =>
        key.toLowerCase().includes("name")
    );
    const typeKey = Object.keys(webData).filter((key) =>
        key.toLowerCase().includes("type")
    );
    const locationKey = Object.keys(webData).filter((key) =>
        key.toLowerCase().includes("location")
    );
    const priceKey = Object.keys(webData).filter((key) =>
        key.toLowerCase().includes("price")
    );
    const surfaceKey = Object.keys(webData).filter((key) =>
        key.toLowerCase().includes("surface")
    );
    const buildingKey = Object.keys(webData).filter((key) =>
        key.toLowerCase().includes("building")
    );
    const bedKey = Object.keys(webData).filter((key) =>
        key.toLowerCase().includes("bed")
    );
    const bathKey = Object.keys(webData).filter((key) =>
        key.toLowerCase().includes("bath")
    );

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
                                <Dialog.Panel className='relative overflow-visible rounded-lg bg-white px-4 pb-4 pt-3 text-left shadow-xl transition-all sm:my-8 sm:px-6'>
                                    <div className='flex flex-col w-[70vh] mb-1 mt-4'>
                                        <div className='flex justify-center'>
                                            {webData[imageKey] ||
                                            webData[imageKey] !== "-" ? (
                                                <img
                                                    src={webData[imageKey]}
                                                    className='w-full h-auto rounded-md'
                                                />
                                            ) : (
                                                <div className='text-xl font-semibold my-10'>
                                                    This Data Don't Have Image
                                                </div>
                                            )}
                                        </div>
                                        <div className='mt-5 text-xl font-medium'>
                                            {webData[nameKey] ||
                                            webData[nameKey] !== "-"
                                                ? webData[nameKey]
                                                : "This Data Don't Have Name"}
                                        </div>
                                        <div className='flex flex-row mt-4 text-md text-gray-700'>
                                            <div className='w-1/5'>Type</div>
                                            <div className='w-4/5'>
                                                <span className='me-2'>:</span>
                                                {webData[typeKey] || "-"}
                                            </div>
                                        </div>
                                        <div className='flex flex-row mt-2 text-md text-gray-700'>
                                            <div className='w-1/5'>
                                                Location
                                            </div>
                                            <div className='w-4/5'>
                                                <span className='me-2'>:</span>
                                                {webData[locationKey] || "-"}
                                            </div>
                                        </div>
                                        <div className='flex flex-row mt-2 text-md text-gray-700'>
                                            <div className='w-1/5'>Price</div>
                                            <div className='w-4/5'>
                                                <span className='me-2'>:</span>
                                                {webData[priceKey] || "-"}
                                            </div>
                                        </div>
                                        <div className='flex flex-row mt-2 text-md text-gray-700'>
                                            <div className='w-1/5'>Surface Area</div>
                                            <div className='w-4/5'>
                                                <span className='me-2'>:</span>
                                                {webData[surfaceKey] || "-"}
                                            </div>
                                        </div>
                                        <div className='flex flex-row mt-2 text-md text-gray-700'>
                                            <div className='w-1/5'>Building Area</div>
                                            <div className='w-4/5'>
                                                <span className='me-2'>:</span>
                                                {webData[buildingKey] || "-"}
                                            </div>
                                        </div>
                                        <div className="flex flex-row mt-5">
                                            <div className="me-5">
                                                <FontAwesomeIcon icon={faBed} className="text-lg me-2" />
                                                {webData[bedKey] || "-"}
                                            </div>
                                            <div>
                                                <FontAwesomeIcon icon={faBath} className="text-lg me-2" />
                                                {webData[bathKey] || "-"}
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
