import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function SlideOvers({ children, open, setOpen }) {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-500'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-500'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-hidden'>
                    <div className='absolute inset-0 overflow-hidden'>
                        <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                            <Transition.Child
                                as={Fragment}
                                enter='transform transition ease-in-out duration-500 sm:duration-700'
                                enterFrom='translate-x-full'
                                enterTo='translate-x-0'
                                leave='transform transition ease-in-out duration-500 sm:duration-700'
                                leaveFrom='translate-x-0'
                                leaveTo='translate-x-full'
                            >
                                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                                    <div className='flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl'>
                                        {children}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

// Here's how to use SlideOvers, but you can customize them as needed.

{
    /* //#region slide over
                <div className='float-right fixed right-5'>
                    <ChevronDoubleLeftIcon
                        className='right-0 w-8 h-8 cursor-pointer float-end'
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <SlideOvers open={open} setOpen={setOpen}>
                    <div className='px-4 py-6 mt-8 sm:px-6'>
                        <div className='flex items-start justify-between'>
                            <Title className='text-base font-semibold leading-6 text-gray-900'>
                                Panel title
                            </Title>
                            <div className='flex items-center ml-3 h-7'>
                                <ButtonIcon
                                    type='button'
                                    className='relative text-indigo-200 rounded-md hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-white'
                                    onClick={() => setOpen(false)}
                                >
                                    <span className='absolute -inset-2.5' />
                                    <span className='sr-only'>Close panel</span>
                                    <XMarkIcon
                                        className='w-6 h-6'
                                        aria-hidden='true'
                                    />
                                </ButtonIcon>
                            </div>
                        </div>
                    </div>
                    <div className='relative flex-1 px-4 mt-6 sm:px-6'>
                        COntent Nenek lo gaming
                    </div>
                </SlideOvers>{" "} */
}
{
    /* //#endregion */
}
