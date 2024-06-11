import { useId, useState } from "react";
import InputLabel from "./Modal/InputLabel";
import { ExclamationTriangleIcon, LinkIcon } from "@heroicons/react/24/solid";
import { useDropzone } from "react-dropzone";
import ErrorLabel from "../../fragments/Notification/ErrorLabel";
import { LogoAddImage } from "../../../assets/imageList";
import ButtonText from "../Button/ButtonText";
import ImageCropper from "../Image/ImageCropper";

export default function InputDropzone(
    { isDropzone, setIsDropzone, label, appName, avatarUrl, updateAvatar, imageNotFound, errorImageMessage, ...props },
    ref
) {
    const [openImageModal, setOpenImageModal] = useState(false);
    const [showImageError, setShowImageError] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const onDrop = (acceptedFile) => {
        if (acceptedFile.length) {
            const file = acceptedFile[0];
            setModalOpen(true);
            setLogoFile(file);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
        maxSize: 2 * 1024 * 1024,
        maxFiles: 1,
    });

    const id = useId();

    return (
        <div className='flex h-full w-full items-center justify-between'>
            <div className='w-2/5 font-semibold text-lg'>
                <InputLabel label={label} htmlFor={id} />
            </div>
            {isDropzone ? (
                <>
                    <div className='w-full'>
                        <div className='w-full flex justify-center relative'>
                            <div
                                {...getRootProps({
                                    className: `w-full h-full place-content-center dropzone cursor-pointer border-dashed rounded-md border-2 ${
                                        imageNotFound
                                            ? "border-red-600"
                                            : "border-gray-300"
                                    } p-4 text-center`,
                                })}
                            >
                                <input
                                    type='file'
                                    {...getInputProps()}
                                    {...props}
                                    ref={ref}
                                />
                                <div className='relative items-center'>
                                    {avatarUrl === LogoAddImage ? (
                                        <>
                                            <div className='w-full h-auto justify-center flex '>
                                                <img
                                                    className='justify-items-center w-16 h-16'
                                                    src={avatarUrl}
                                                />
                                            </div>
                                            <div>
                                                <span className='bg-transparent text-indigo-500 semibold mr-1'>
                                                    Upload a pic with
                                                </span>
                                                <span className='text-indigo-500 font-bold'>
                                                    transparent background
                                                </span>
                                            </div>
                                            <div className='text-gray-400'>
                                                PNG or JPG up to 2MB
                                            </div>
                                        </>
                                    ) : (
                                        <div className='w-full h-auto justify-center flex '>
                                            <img
                                                className='justify-items-center w-36 h-36'
                                                src={avatarUrl}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {imageNotFound && (
                            <div className='mt-2 flex items-center'>
                                <span
                                    onMouseEnter={() => setShowImageError(true)}
                                    onMouseLeave={() =>
                                        setShowImageError(false)
                                    }
                                    className='cursor-pointer py-1'
                                >
                                    <ExclamationTriangleIcon className='w-7 h-7 text-red-600' />
                                </span>
                                {showImageError && (
                                    <div className='ml-2'>
                                        <ErrorLabel
                                            message={errorImageMessage}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {modalOpen && (
                        <ImageCropper 
                            file={logoFile}
                            updateAvatar={updateAvatar}
                            closeModal={() => setModalOpen(false)}
                        />
                    )}
                </>
            ) : (
                <div className='flex w-full items-center justify-between'>
                    <div className='flex items-center'>
                        <span className='mr-2'>
                            <LinkIcon className='w-5 h-5 text-gray-500' />
                        </span>
                        <div
                            className='text-md w-fit underline cursor-pointer'
                            onClick={() => setOpenImageModal(true)}
                        >
                            {`Logo ${appName}`}
                        </div>
                    </div>
                    <div className='mr-20 items-center'>
                        <ButtonText
                            text={"Change"}
                            type={"button"}
                            onClick={() => setIsDropzone(true)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
