import { ChevronDoubleLeftIcon, XMarkIcon } from "@heroicons/react/20/solid";
import SlideOvers from "../../components/fragments/SlideOvers";
import { useState } from "react";
import { ButtonIcon, Title } from "../../components/elements";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <ChevronDoubleLeftIcon
                className='w-8 h-8 float-end cursor-pointer right-0'
                onClick={() => setOpen(!open)}
            />
            <SlideOvers open={open} setOpen={setOpen}>
                <div className='px-4 py-6 sm:px-6 mt-8'>
                    <div className='flex items-start justify-between'>
                        <Title className='text-base font-semibold leading-6 text-gray-900'>
                            Panel title
                        </Title>
                        <div className='ml-3 flex h-7 items-center'>
                            <ButtonIcon
                                type='button'
                                className='relative rounded-md text-indigo-200 hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-white'
                                onClick={() => setOpen(false)}
                            >
                                <span className='absolute -inset-2.5' />
                                <span className='sr-only'>Close panel</span>
                                <XMarkIcon
                                    className='h-6 w-6'
                                    aria-hidden='true'
                                />
                            </ButtonIcon>
                        </div>
                    </div>
                </div>
                <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                    {/* COntent */}
                    Nenek lo gaming
                </div>
            </SlideOvers>
        </>
    );
};

export default Dashboard;
