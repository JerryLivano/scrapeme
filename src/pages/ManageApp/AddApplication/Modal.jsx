import { XMarkIcon } from "@heroicons/react/24/outline";
import ImageCropper from "../../../components/elements/Image/ImageCropper";

const Modal = ({ logoFile, onCropComplete, closeModal }) => {
    return (
        <div
            className='relative z-50'
            aria-labelledby='crop-image-dialog'
            role='dialog'
            aria-modal='true'
        >
            <div className='fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity'></div>
            <div className='fixed inset-0 z-10 overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center px-4 py-12 text-center sm:block sm:p-0'>
                    <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                        <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                            <div className='sm:flex sm:items-start'>
                                <div className='mt-3 text-center sm:mt-0 sm:text-left w-full'>
                                    <h3
                                        className='text-lg leading-6 font-medium text-gray-900'
                                        id='crop-image-dialog'
                                    >
                                        Crop Image
                                    </h3>
                                    <div className='mt-2'>
                                        <ImageCropper
                                            logoFile={logoFile}
                                            onCropComplete={onCropComplete}
                                            closeModal={closeModal}
                                        />
                                    </div>
                                </div>
                                <div className='absolute top-0 right-0 pt-4 pr-4'>
                                    <button
                                        type='button'
                                        className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none'
                                        onClick={closeModal}
                                    >
                                        <span className='sr-only'>Close</span>
                                        <XMarkIcon
                                            className='h-6 w-6'
                                            aria-hidden='true'
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                            <button
                                type='button'
                                className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
