import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import DropdownInput from "../../components/elements/Input/DropdownInput";
import ImageCropper from "../../components/elements/Image/ImageCropper";
import { Button } from "../../components/index.js";
import ButtonText from "../../components/elements/Button/ButtonText";
import ModalConfirmAddData from "../../components/elements/Confirmation/ModalConfirmAddData";
import {
    toastError,
    toastSuccess,
} from "../../components/elements/Alert/Toast";
import {
    useGetUrlImageQuery,
    useUpdateApplicationMutation,
} from "../../services/applicationApiSlice";
import Spinner from "../../components/elements/Spinner/Spinner";
import SingleLineInput from "../../components/elements/Input/SingleLineInput";
import { LinkIcon } from "@heroicons/react/24/solid";
import FormModal from "../../components/fragments/Form/FormModal";
import { useDropzone } from "react-dropzone";
import { LogoAddImage } from "../../assets/imageList.js";

export default function FormEditApplication({ application }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors: formErrors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: application.name || "",
            url: application.url
                ? application.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
                : "",
            logo: application.photo || "",
        },
    });

    const [selectedStatus, setSelectedStatus] = useState(application.isActive);

    const [isDropzone, setIsDropzone] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [openImageModal, setOpenImageModal] = useState(false);

    const [imageNotFound, setImageNotFound] = useState(false);
    const [showImageError, setShowImageError] = useState(false);
    const [errorImageMessage, setErrorImageMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [logoFile, setLogoFile] = useState(null);

    const statusOptions = [
        { isActive: true, status: "Enabled" },
        { isActive: false, status: "Disabled" },
    ];

    useEffect(() => {
        if (!application) return;
        setValue("name", application.name);
        setValue(
            "url",
            application.url
                ? application.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
                : ""
        );
        setValue("logo", application.photo);
        setValue("status", application.isActive);
    }, [application, setValue]);

    const {
        data: imageData,
        isLoading: imageLoading,
        isSuccess: imageSuccess,
    } = useGetUrlImageQuery(application.id);

    const [updateApplication, { isLoading: updateAppLoading }] =
        useUpdateApplicationMutation();

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
        maxSize: 2 * 1024 * 1024,
        maxFiles: 1,
    });

    const avatarUrl = useRef(LogoAddImage);
    const updateAvatar = (imgSrc) => {
        avatarUrl.current = imgSrc;
        setValue("logo", imgSrc.slice(imgSrc.indexOf(",") + 1));
        setLogoFile(imgSrc);
    };

    const onSubmit = async (data) => {
        if (
            data.name.trim() === "" ||
            data.url.trim() === "" ||
            data.logo.trim() === ""
        ) {
            setShowModal(false);
            toastError({ message: "Field cannot be empty" });
            return;
        }

        const request = {
            id: application.id,
            name: data.name.trim(),
            photo: data.logo.trim(),
            url: `https://${data.url
                .trim()
                .replace(/^https?:\/\//, "")
                .replace(/\/$/, "")}`,
            isActive: selectedStatus,
        };

        try {
            await updateApplication(request).unwrap();
            toastSuccess({ message: "Successfully updated application" });
        } catch {
            toastError({ message: "Failed to update application" });
        }
        setShowModal(false);
    };

    return (
        <>
            {updateAppLoading && <Spinner />}
            {!updateAppLoading && (
                <div className='w-full border border-gray-300 rounded-md px-8 py-6'>
                    <form
                        className='flex grow basis-2/3 flex-col gap-4'
                        encType='multipart/form-data'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className='border-b-2 w-full pl-6 py-8 items-center'>
                            <SingleLineInput
                                {...register("name")}
                                error={formErrors.name?.message}
                                label='Application Name'
                                className='w-full'
                                errorMessage={"Please enter application name"}
                            />
                        </div>
                        <div className='border-b-2 w-full pl-6 py-8 items-center'>
                            <SingleLineInput
                                {...register("url")}
                                error={formErrors.url?.message}
                                startAdornment={"https://"}
                                label='URL'
                                className='w-full'
                                errorMessage={"Please enter application url"}
                            />
                        </div>
                        <div className='border-b-2 w-full pl-6 py-8 items-center'>
                            <div className='flex h-full w-full items-center justify-between'>
                                <div className='w-2/5 font-semibold text-lg'>
                                    <label htmlFor='logo'>Logo</label>
                                </div>
                                {isDropzone ? (
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
                                                    {...register("logo")}
                                                    {...getInputProps()}
                                                />
                                                <div className='relative items-center'>
                                                    {avatarUrl.current ===
                                                    LogoAddImage ? (
                                                        <>
                                                            <div className='w-full h-auto justify-center flex '>
                                                                <img
                                                                    className='justify-items-center w-16 h-16'
                                                                    src={
                                                                        avatarUrl.current
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <span className='bg-transparent text-indigo-500 semibold mr-1'>
                                                                    Upload a pic
                                                                    with
                                                                </span>
                                                                <span className='text-indigo-500 font-bold'>
                                                                    transparent
                                                                    background
                                                                </span>
                                                            </div>
                                                            <div className='text-gray-400'>
                                                                PNG or JPG up to
                                                                2MB
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className='w-full h-auto justify-center flex '>
                                                            <img
                                                                className='justify-items-center w-36 h-36'
                                                                src={
                                                                    avatarUrl.current
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {imageNotFound && (
                                            <div className='mt-2 flex items-center'>
                                                <span
                                                    onMouseEnter={() =>
                                                        setShowImageError(true)
                                                    }
                                                    onMouseLeave={() =>
                                                        setShowImageError(false)
                                                    }
                                                    className='cursor-pointer py-1'
                                                >
                                                    <ExclamationCircleIcon className='w-7 h-7 text-red-600' />
                                                </span>
                                                {showImageError && (
                                                    <div className='ml-2'>
                                                        <ErrorLabel
                                                            message={
                                                                errorImageMessage
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className='flex w-full items-center justify-between'>
                                        <div className='flex items-center'>
                                            <span className='mr-2'>
                                                <LinkIcon className='w-5 h-5 text-gray-500' />
                                            </span>
                                            <div
                                                className='text-md w-fit underline cursor-pointer'
                                                onClick={() =>
                                                    setOpenImageModal(true)
                                                }
                                            >
                                                {`Logo ${application.name}`}
                                            </div>
                                        </div>
                                        <div className='mr-20 items-center'>
                                            <ButtonText
                                                text={"Change"}
                                                type={"button"}
                                                onClick={() =>
                                                    setIsDropzone(true)
                                                }
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='w-full pl-6 py-8 items-center'>
                            <DropdownInput
                                required
                                label={"Status"}
                                className={"w-1/4"}
                                onChange={(e) => {
                                    setSelectedStatus(
                                        e.target.value === "Enabled"
                                    );
                                    setValue(
                                        "status",
                                        e.target.value === "Enabled"
                                    );
                                }}
                            >
                                {statusOptions.map((option) => (
                                    <option
                                        key={option.status}
                                        value={option.status}
                                        selected={
                                            option.isActive ===
                                            application.isActive
                                        }
                                    >
                                        {option.status}
                                    </option>
                                ))}
                            </DropdownInput>
                        </div>
                        <div className='grow basis-1/3 flex justify-end py-4'>
                            <Button
                                text={"Save"}
                                type={"submit"}
                                className={"px-16"}
                            />
                        </div>
                    </form>
                    <ModalConfirmAddData
                        title={"Confirm Update Application"}
                        message={`Are you sure want to update ${application.name}?`}
                        onConfirmHandler={handleSubmit(onSubmit)}
                        openModal={showModal}
                        setOpenModal={setShowModal}
                        typeButton={"submit"}
                    />

                    <FormModal
                        open={openImageModal}
                        setOpen={setOpenImageModal}
                        titleForm={`Logo ${application.name}`}
                    >
                        <div className='w-96 items-center justify-center flex'>
                            {imageSuccess && !imageLoading ? (
                                <img src={imageData.data} alt='' />
                            ) : (
                                <Spinner />
                            )}
                        </div>
                    </FormModal>

                    {modalOpen && (
                        <ImageCropper
                            file={logoFile}
                            updateAvatar={updateAvatar}
                            closeModal={() => setModalOpen(false)}
                        />
                    )}
                </div>
            )}
        </>
    );
}
