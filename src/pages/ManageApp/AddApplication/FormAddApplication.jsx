import { useForm } from "react-hook-form";
import SingleLineInput from "../../../components/elements/Input/SIngleLineInput";
import DropdownInput from "../../../components/elements/Input/DropdownInput";
import { useState } from "react";
import { Button } from "../../../components";
import Modal from "./Modal";
import { useDropzone } from "react-dropzone";

export default function FormAddApplication() {
    const [selectedStatus, setSelectedStatus] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);

    const statusOptions = ["Enabled", "Disabled"];

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
            setLogoFile(URL.createObjectURL(file));
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

    const handleCropComplete = (crop, imageRef) => {
        if (!crop || !imageRef) {
            return;
        }

        const canvas = document.createElement("canvas");
        const scaleX = imageRef.naturalWidth / imageRef.width;
        const scaleY = imageRef.naturalHeight / imageRef.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            imageRef,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    console.error("Canvas is empty");
                    return;
                }
                const croppedImageUrl = URL.createObjectURL(blob);
                setCroppedImageUrl(croppedImageUrl);
                setValue("logo", croppedImageUrl);
                setModalOpen(false);
            },
            "image/jpeg",
            1
        );
    };

    return (
        <div className='w-full border border-gray-300 rounded-md px-8 py-6'>
            <form
                className='flex grow basis-2/3 flex-col gap-4'
                encType='multipart/form-data'
            >
                <table className='w-full'>
                    <tr className='border-b-2 items-center'>
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
                    <tr className='border-b-2 items-center'>
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
                    <tr className='border-b-2 items-center'>
                        <td className='font-semibold text-lg px-8'>
                            <label htmlFor='logo'>Logo</label>
                        </td>
                        <td className='w-full flex py-6'>
                            <div className='flex'>
                                <div
                                    {...getRootProps({
                                        className:
                                            "dropzone cursor-pointer border-dashed rounded-md border-2 border-gray-300 p-4 text-center",
                                    })}
                                >
                                    <input {...getInputProps()} />
                                    {croppedImageUrl ? (
                                        <img
                                            src={croppedImageUrl}
                                            alt='Cropped Image'
                                            className='w-full h-auto'
                                        />
                                    ) : (
                                        <p>
                                            Drag 'n' drop a file here, or click
                                            to select a file
                                        </p>
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
            {modalOpen && (
                <Modal
                    logoFile={logoFile}
                    onCropComplete={handleCropComplete}
                    closeModal={() => setModalOpen(false)}
                />
            )}
        </div>
    );
}
