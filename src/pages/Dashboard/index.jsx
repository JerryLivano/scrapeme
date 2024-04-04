import { ChevronDoubleLeftIcon, XMarkIcon } from "@heroicons/react/20/solid";
import SlideOvers from "../../components/fragments/SlideOvers";
import { useState } from "react";
import { ButtonIcon, Title } from "../../components/elements";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <ChevronDoubleLeftIcon
                className='right-0 w-8 h-8 cursor-pointer float-end'
                onClick={() => setOpen(!open)}
            />
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
                    {/* COntent */}
                    Nenek lo gaming
                </div>
            </SlideOvers>
        </>
    );
};

export default Dashboard;
