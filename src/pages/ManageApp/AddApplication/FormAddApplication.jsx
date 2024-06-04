import { useForm } from "react-hook-form";
import { LogoAddImage } from "../../../assets/imageList";
import DropdownInput from "../../../components/elements/Input/DropdownInput";
import { useState, useRef } from "react";
import { Button } from "../../../components";
import ImageCropper from "../../../components/elements/Image/ImageCropper";
import { useDropzone } from "react-dropzone";
import "react-image-crop/dist/ReactCrop.css";
import SingleLineInput from "../../../components/elements/Input/SIngleLineInput";
import { useCreateApplicationMutation } from "../../../services/applicationApiSlice";
import {
    toastError,
    toastSuccess,
} from "../../../components/elements/Alert/Toast";
import ModalConfirmAddData from "../../../components/elements/Confirmation/ModalConfirmAddData";

export default function FormAddApplication() {
    const [modalOpen, setModalOpen] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [showAddApplication, setShowAddApplication] = useState(false);
    const statusOptions = ["Disabled", "Enabled"];

    const [nameNotFound, setNameNotFound] = useState(false);
    const [urlNotFOund, setUrlNotFound] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset: formAppReset,
        formState: { errors: formErrors },
        setValue,
    } = useForm({
        defaultValues: {
            name: "",
            url: "",
            logo: "",
            isActive: false,
        },
        mode: "onChange",
    });

    const { handleSubmit: openModal } = useForm({});

    const [createApplication, { isLoading: createAppLoading }] =
        useCreateApplicationMutation();

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length) {
            const file = acceptedFiles[0];
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
        maxFiles: 1,
    });

    const avatarUrl = useRef(LogoAddImage);
    const updateAvatar = (imgSrc) => {
        avatarUrl.current = imgSrc;
        setValue("logo", imgSrc.slice(imgSrc.indexOf(",") + 1));
        setLogoFile(imgSrc);
    };

    const onSubmit = async (data) => {
        if (data.name.trim() === "" || data.url.trim() === "") {
            if (data.name.trim() === "") {
                setNameNotFound(true);
            }

            if (data.url.trim() === "") {
                setUrlNotFound(true);
            }

            setShowAddApplication(false);
            window.scrollTo(0, 0);
            return;
        }

        try {
            const request = {
                name: data.name,
                url: `https://${data.url}`,
                isActive: data.isActive,
                image: data.logo,
            };
            await createApplication(request).unwrap();
            formAppReset();
            avatarUrl.current = LogoAddImage;
            toastSuccess({ message: "Successfully created application" });
        } catch {
            toastError({ message: "Failed to create application" });
        }
        setShowAddApplication(false);
        return;
    };

    return (
        <div className='w-full border border-gray-300 rounded-md px-8 py-6'>
            <form
                className='flex items-end w-full flex-col gap-4'
                encType='multipart/form-data'
                onSubmit={openModal(() => setShowAddApplication(true))}
            >
                <table className='w-full'>
                    <tr className='border-b-2'>
                        <td className='font-semibold text-lg px-8'>
                            <label htmlFor='name'>Application Name</label>
                        </td>
                        <td className='w-full flex py-6'>
                            <div className='flex'>
                                <SingleLineInput
                                    {...register("name")}
                                    error={formErrors.name?.message}
                                    placeholder='Input Application Name Here...'
                                    label='Name'
                                    id='name'
                                    className='w-full'
                                    notFound={nameNotFound}
                                    errorMessage={"Fill in this field"}
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
                                    notFound={urlNotFOund}
                                    errorMessage={"Fill in this field"}
                                />
                            </div>
                        </td>
                    </tr>
                    <tr className='w-full border-b-2'>
                        <td className='font-semibold text-lg px-8 '>
                            <label htmlFor='logo'>Logo</label>
                        </td>
                        <td className='w-full flex py-6 justify-center'>
                            <div className='w-full'>
                                <div
                                    {...getRootProps({
                                        className:
                                            "h-full place-content-center dropzone cursor-pointer border-dashed rounded-md border-2 border-gray-300 p-4 text-center",
                                    })}
                                >
                                    <input
                                        type='file'
                                        {...register("logo")}
                                        {...getInputProps()}
                                    />
                                    <div className='relative items-center'>
                                        {avatarUrl.current === LogoAddImage ? (
                                            <>
                                                <div className='w-full h-auto justify-center flex '>
                                                    <img
                                                        className='justify-items-center w-16 h-16'
                                                        src={avatarUrl.current}
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
                                                    src={avatarUrl.current}
                                                />
                                            </div>
                                        )}
                                    </div>
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
                                required
                                className='w-1/3'
                                onChange={(e) => {
                                    setValue(
                                        "isActive",
                                        e.target.value === "Enabled"
                                    );
                                }}
                            >
                                {statusOptions.map((status) => (
                                    <option
                                        key={status}
                                        value={status}
                                        selected={
                                            watch("isActive")
                                                ? status === "Enabled"
                                                : status === "Disabled"
                                        }
                                    >
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

            <ModalConfirmAddData
                title={"Confirm Add Application"}
                message={`Are you sure want to add ${watch("name")}?`}
                onConfirmHandler={handleSubmit(onSubmit)}
                openModal={showAddApplication}
                setOpenModal={setShowAddApplication}
                typeButton={"submit"}
            />

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
