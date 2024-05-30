import { useForm } from "react-hook-form";
import { LogoAddImage } from "../../../assets/imageList";
import SingleLineInput from "../../../components/elements/Input/SIngleLineInput";
import DropdownInput from "../../../components/elements/Input/DropdownInput";
import { useState, useRef } from "react";
import ImageCropper from "../../../components/elements/Image/ImageCropper";
import { Button } from "../../../components";
import Modal from "./Modal";
import { useDropzone } from "react-dropzone";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function FormAddApplication() {
    const [selectedStatus, setSelectedStatus] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const [crop, setCrop] = useState({ aspect: 1 });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [imageRef, setImageRef] = useState(null);
    const statusOptions = ["Enabled", "Disabled"];

    const avatarUrl = useRef(LogoAddImage);


    const updateAvatar = (imgSrc) => {
        avatarUrl.current = imgSrc;
    };
    
    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
        reset,
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            name: "",
            url: "",
            logo: "",
            status: "",
        },
        mode: "onChange",
    });

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length) {
            const file = acceptedFiles[0];
            setLogoFile(URL.createObjectURL(file));
            setModalOpen(true);
        }
    };

    // console.log(modalOpen);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
        maxFiles: 1,
    });

    // const onImageLoaded = (image) => {
    //     setImageRef(image);
    // };

    // const onCropComplete = (crop) => {
    //     setCompletedCrop(crop);
    // };

    // const onCropChange = (crop) => {
    //     setCrop(crop);
    // };

    // const getCroppedImg = () => {
    //     if (!imageRef || !completedCrop.width || !completedCrop.height) {
    //         return;
    //     }
    //     const canvas = document.createElement("canvas");
    //     const scaleX = imageRef.naturalWidth / imageRef.width;
    //     const scaleY = imageRef.naturalHeight / imageRef.height;
    //     canvas.width = completedCrop.width;
    //     canvas.height = completedCrop.height;
    //     const ctx = canvas.getContext("2d");

    //     ctx.drawImage(
    //         imageRef,
    //         completedCrop.x * scaleX,
    //         completedCrop.y * scaleY,
    //         completedCrop.width * scaleX,
    //         completedCrop.height * scaleY,
    //         0,
    //         0,
    //         completedCrop.width,
    //         completedCrop.height
    //     );

    //     return new Promise((resolve, reject) => {
    //         canvas.toBlob(
    //             (blob) => {
    //                 if (!blob) {
    //                     console.error("Canvas is empty");
    //                     return;
    //                 }
    //                 blob.name = "cropped.jpg";
    //                 resolve(blob);
    //             },
    //             "image/jpeg",
    //             1
    //         );
    //     });
    // };

    // const handleSaveCrop = async () => {
    //     const croppedImage = await getCroppedImg();
    //     setValue("logo", croppedImage);

    //     // Create a URL for the cropped image to display in the dropzone
    //     const croppedImageUrl = URL.createObjectURL(croppedImage);
    //     setCroppedImageUrl(croppedImageUrl);

    //     setModalOpen(false);
    // };

    return (
        <div className='w-full border border-gray-300 rounded-md px-8 py-6'>
            <form
                className='flex items-end w-full flex-col gap-4'
                encType='multipart/form-data'
            >
                <table className='w-full'>
                    <tr className='border-b-2'>
                        <td className='font-semibold text-lg px-8'>
                            <label htmlFor='name'>Application Name</label>
                        </td>
                        <td className='w-full flex pt-2 pb-6'>
                            <div className='flex'>
                                <SingleLineInput
                                    {...register("name")}
                                    error={formErrors.name?.message}
                                    placeholder='Input Application Name Here...'
                                    label='Name'
                                    id='name'
                                    className='w-full'
                                    errorMessage={
                                        "Please enter application name"
                                    }
                                />
                            </div>
                        </td>
                    </tr>
                    <tr className='border-b-2'>
                        <td className='font-semibold text-lg px-8'>
                            <label htmlFor='url'>URL</label>
                        </td>
                        <td className='w-full flex py-6'>
                            <div className='flex'>
                                <SingleLineInput
                                    {...register("url")}
                                    error={formErrors.url?.message}
                                    startAdornment={"https://"}
                                    label='Url'
                                    id='url'
                                    className='w-full'
                                    errorMessage={
                                        "Please enter application url"
                                    }
                                />
                            </div>
                        </td>
                    </tr>
                    <tr className='w-full border-b-2'>
                        <td className='font-semibold text-lg px-8 '>
                            <label htmlFor='logo'>Logo</label>
                        </td>
                        <td className='w-full flex py-6 justify-center'>
                            <div className='w-full mr-8'>
                                <div
                                    {...getRootProps({
                                        className:
                                            "h-full place-content-center dropzone cursor-pointer border-dashed rounded-md border-2 border-gray-300 p-4 text-center",
                                    })}
                                >
                                    <input {...getInputProps()} />
                                    {croppedImageUrl ? (
                                        <img
                                            src={avatarUrl.current}
                                            alt='Cropped Image'
                                            className='w-auto h-auto'
                                        />
                                    ) : (
                                        <div className='relative items-center'>
                                            <div className="w-full h-full justify-center flex ">
                                                <img
                                                    className='justify-items-center mr-2 w-auto'
                                                    src={avatarUrl.current}
                                                    alt='Logo BRM Footer'
                                                />  
                                            </div>
                                             
                                            <p>
                                                <span className="bg-transparent text-blue-700 semibold mr-1">
                                                Upload a pic with 
                                                </span>
                                                <span className="text-blue-700 font-bold">
                                                transparent background
                                                </span>
                                                <p className="text-gray-400">
                                                PNG or JPG up to 2MB
                                                </p>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className='items-center'>
                        <td className='font-semibold text-lg px-8'>
                            <label htmlFor='status'>Status</label>
                        </td>
                        <td className='w-full flex py-6'>
                            <DropdownInput
                                placeholder={"--- Select Status ---"}
                                required
                                className='w-1/3'
                                value={selectedStatus}
                                onChange={(e) => {
                                    setSelectedStatus(e.target.value);
                                    setValue("status", e.target.value);
                                }}
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </DropdownInput>
                        </td>
                    </tr>
                </table>
                <div className='grow basis-1/3 flex justify-end py-4'>
                    <Button text={"Save"} type={"submit"} />
                </div>
            </form>
            {/* {console.log(logoFile)} */}
            {modalOpen && (
                <Modal
                updateAvatar={updateAvatar}
                closeModal={() => setModalOpen(false)}>
                <ImageCropper
                  closeModal={() => setModalOpen(false)}
                //   onCrop={handleSaveCrop}
                  updateAvatar={updateAvatar}

                />
              </Modal>
            )}
        </div>
    );
}
