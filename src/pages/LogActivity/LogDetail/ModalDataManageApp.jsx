import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Fragment } from "react";
import DataTable from "../../../components/layouts/DataTable";

export default function ModalDataAddApp({ open, setOpen, titleForm, children, columns, data, selectedUser }) {

    const [roleOpt, setRoleOpt] = useState([]);
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as={"div"} className={"relative z-[60]"} onClose={() => setOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-300 opacity-75 transition-opacity' />
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
                            <Dialog.Panel className='relative overflow-visible rounded-lg bg-white px-4 pb-4 pt-5 shadow-xl transition-all sm:my-8 sm:p-6'>
                                <div className='mx-5 mb-2 flex justify-between rounded-t border-b border-solid border-[#E1E3EA] pb-6 pt-3 '>
                                    <h3 className='text-xl w-full text-center font-semibold text-[#181C32]'>
                                        {titleForm}
                                    </h3>
                                    <button
                                        className='float-right -mt-0.5 ml-auto border-0 text-xl font-semibold leading-none text-[#181C32] outline-none focus:outline-none'
                                        onClick={() => setOpen(false)}
                                    >
                                        <XMarkIcon className='block h-6 w-6 font-light text-[#181C32] outline-none hover:opacity-50 focus:outline-none' />
                                    </button>
                                </div>
                                {/*body*/}
                                {children}
                            
                                <div className='mt-4'>
                                    <div className="font-normal text-start">
                                        Old Data
                                    </div>
                                    <DataTable
                                        rowCount={selectedUser.data?.length || 0}
                                        data={selectedUser.data || []}
                                        columns={columns}
                                    />
                                </div>
                                <div className='mt-4'>
                                    <div className="font-normal text-start">
                                        Recent Data
                                    </div>
                                    <DataTable
                                        rowCount={selectedUser.data?.length || 0}
                                        data={selectedUser.data || []}
                                        columns={columns}
                                    />
                                </div>
                                
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
