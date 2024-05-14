import { EllipsisVerticalIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const BtnModify = ({ setModifyAccess, openModify, setOpenModify }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleCheckClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleNotification = () => {
    setIsDialogOpen(false);
    setIsNotification(true);
  }
  
  return (
    <td className="w-10 ml-6 mx-2 text-sm justify-center font-medium text-gray-900 sm:pl-0">
      <button
        className="font-bold text-black w-full justify-center py-3 mt-2 px-4 rounded"
        type="button"
        onClick={() => {
          setModifyAccess(true);
          setOpenModify(openModify === "check" ? null : "check");
          if (openModify === "check") {
            handleCheckClick();
          }
        }}
      >
        {openModify ? (
          <span className="w-full flex justify-items-center">
            <XMarkIcon className="h-5 w-7 flex justify-center text-black" />
            <CheckIcon className="h-5 w-7 flex justify-center text-black" />
            <CheckIcon className="h-5 w-7 flex justify-center text-black" />
          </span>
        ) : (
          <EllipsisVerticalIcon className="text-black h-5 w-7 -mt-3" />
        )}
      </button>
      <Transition.Root show={isDialogOpen} as={Fragment}>
        <Dialog className="relative z-10" onClose={handleDialogClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div> */}
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="font-semibold text-lg leading-6 text-gray-900">
                        Are you sure you want to save the changes
                      </Dialog.Title>
                      {/* <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                        </p>
                      </div> */}
                    </div>
                  </div>
                  <div className="mt-5 inline-flex w-full sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-[200px] justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleDialogClose}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-[200px] justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleNotification}
                    >
                      Yes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={isNotification} as={Fragment}>
        <Dialog className="fixed top-0 right-0 z-50" onClose={() => setIsNotification(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="top-0 inset-0 z-50 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-end p-4 mr-16 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div className="items-center inline-flex">
                    <div className="mx-auto flex h-12 w-12 ml-1 items-center justify-center rounded-full border-black-  bg-green-200">
                      <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="text-center ">
                      <Dialog.Title as="h3" className="font-semibold text-lg leading-6 text-gray-900">
                        Successfully saved!
                      </Dialog.Title>
                      <div className="mt-2 text-center ml-6">
                        <p className="text-sm text-gray-500">
                          User data has been updated
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </td>
  );
};

export default BtnModify;