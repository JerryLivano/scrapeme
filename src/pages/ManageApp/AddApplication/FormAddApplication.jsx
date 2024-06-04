import { useForm } from "react-hook-form";
import { LogoAddImage } from "../../../assets/imageList";
import SingleLineInput from "../../../components/elements/Input/SingleLineInput";
import DropdownInput from "../../../components/elements/Input/DropdownInput";
import { useState, useRef } from "react";
import { Button } from "../../../components";
import ImageCropper from "../../../components/elements/Image/ImageCropper";
import { useDropzone } from "react-dropzone";
import "react-image-crop/dist/ReactCrop.css";

export default function FormAddApplication() {
    const [selectedStatus, setSelectedStatus] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const statusOptions = ["Enabled", "Disabled"];

    const avatarUrl = useRef(LogoAddImage);

    const updateAvatar = (imgSrc, fileName) => {
        avatarUrl.current = imgSrc;
        setLogoFile(fileName);
    };

    console.log(logoFile);
    const onSubmit = (data) => {
        data.logo = logoFile; 
    };

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
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
            setLogoFile(file);
            setModalOpen(true);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
        maxFiles: 1,
    });


    return (
        <div className='w-full border border-gray-300 rounded-md px-8 py-6'>
            <form
                className='flex items-end w-full flex-col gap-4'
                encType='multipart/form-data'
                onSubmit={handleSubmit(onSubmit)}
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
                                    <input type='file' {...getInputProps()}/>
                                    {croppedImageUrl ? (
                                        <img
                                            src={avatarUrl.current}
                                            alt='Cropped Image'
                                            className='w-auto h-auto'
                                        />
                                    ) : (
                                        <div className='relative items-center'>
                                            <div className='w-full h-auto justify-center flex '>
                                                <img
                                                    className='justify-items-center w-24 h-24 mr-2 my-4'
                                                    src={avatarUrl.current}
                                                />
                                            </div>

                                            <p>
                                                <span className='bg-transparent text-indigo-500 semibold mr-1'>
                                                    Upload a pic with
                                                </span>
                                                <span className='text-indigo-500 font-bold'>
                                                    transparent background
                                                </span>
                                                <p className='text-gray-400'>
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
                    <Button text={"Save"} type={"submit"} className={"px-16"} />
                </div>
            </form>
            {modalOpen && (
                <ImageCropper
                    file={logoFile}
                    updateAvatar={updateAvatar}
                    closeModal={() => setModalOpen(false)}
                />
            )}
        </div>
    );
}
