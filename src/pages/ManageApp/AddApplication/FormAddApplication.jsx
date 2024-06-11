import { useForm } from "react-hook-form";
import { LogoAddImage } from "../../../assets/imageList";
import DropdownInput from "../../../components/elements/Input/DropdownInput";
import { useState, useRef, useEffect } from "react";
import { Button } from "../../../components";
import ImageCropper from "../../../components/elements/Image/ImageCropper";
import { useDropzone } from "react-dropzone";
import "react-image-crop/dist/ReactCrop.css";
import SingleLineInput from "../../../components/elements/Input/SingleLineInput";
import { useCreateApplicationMutation } from "../../../services/applicationApiSlice";
import {
    toastError,
    toastSuccess,
} from "../../../components/elements/Alert/Toast";
import ModalConfirmAddData from "../../../components/elements/Confirmation/ModalConfirmAddData";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import ErrorLabel from "../../../components/fragments/Notification/ErrorLabel";

export default function FormAddApplication() {
    const [modalOpen, setModalOpen] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [showAddApplication, setShowAddApplication] = useState(false);
    const statusOptions = ["Disabled", "Enabled"];

    const [nameNotFound, setNameNotFound] = useState(false);
    const [urlNotFound, setUrlNotFound] = useState(false);
    const [imageNotFound, setImageNotFound] = useState(false);
    const [showImageError, setShowImageError] = useState(false);
    const [errorImageMessage, setErrorImageMessage] = useState("");

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

        const onDrop = (acceptedFiles, rejectedFiles) => {
            let fileRejected = false;
            let sizeError = false;
            let typeError = false;
        
            rejectedFiles.forEach(rejected => {
                if (rejected.errors.some(e => e.code === 'file-too-large')) {
                    sizeError = true;
                }
                if (rejected.errors.some(e => e.code === 'file-invalid-type')) {
                    typeError = true;
                }
            });
        
            if (sizeError) {
                setShowImageError(true);
                toastError({ message: "Picture size is more than 2MB" });
                setLogoFile(null);
                fileRejected = true;
            }
        
            if (typeError) {
                setShowImageError(true);
                toastError({ message: 'Picture format is not png or jpg or jpeg' });
                setLogoFile(null);
                fileRejected = true;
            }
        
            if (!fileRejected && acceptedFiles.length) {
                const file = acceptedFiles[0];
                if (file.size > 2 * 1024 * 1024) {
                    setShowImageError(true);
                    toastError({ message: "File cannot exceed 2MB" });
                    setLogoFile(null);
                    return;
                }
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
        maxSize: 10 * 1024 * 1024,
        maxFiles: 1,
    });

    const avatarUrl = useRef(LogoAddImage);
    const updateAvatar = (imgSrc) => {
        avatarUrl.current = imgSrc;
        setValue("logo", imgSrc.slice(imgSrc.indexOf(",") + 1));
        setLogoFile(imgSrc);
    };

    useEffect(() => {
        if (
            watch("name").trim() !== "" ||
            watch("url").trim() !== "" ||
            avatarUrl.current !== LogoAddImage
        ) {
            setNameNotFound(false);
            setUrlNotFound(false);
            setImageNotFound(false);
        }
    });

    const onSubmit = async (data) => {
        if (
            data.name.trim() === "" ||
            data.url.trim() === "" ||
            avatarUrl.current === LogoAddImage
        ) {
            if (data.name.trim() === "") {
                setNameNotFound(true);
            }

            if (data.url.trim() === "") {
                setUrlNotFound(true);
            }

            if (avatarUrl.current === LogoAddImage) {
                setImageNotFound(true);
                setErrorImageMessage("Fill in this field");
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
            location.reload();
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
                <div className='border-b-2 w-full pl-6 py-8 items-center'>
                    <SingleLineInput
                        {...register("name")}
                        error={formErrors.name?.message}
                        placeholder='Input Application Name Here...'
                        label='Application Name'
                        notFound={nameNotFound}
                        errorMessage={"Fill in this field"}
                    />
                </div>
                <div className='border-b-2 w-full pl-6 py-8 items-center'>
                    <SingleLineInput
                        {...register("url")}
                        error={formErrors.url?.message}
                        startAdornment={"https://"}
                        label='URL'
                        notFound={urlNotFound}
                        errorMessage={"Fill in this field"}
                    />
                </div>
                <div className='border-b-2 w-full pl-6 py-8 items-center'>
                    <div className='flex h-full w-full items-center justify-between'>
                        <div className='w-2/5 font-semibold text-lg'>
                            <label htmlFor='logo'>Logo</label>
                        </div>
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
                                                    PNG or JPG or JPEG up to 2MB
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
                    </div>
                </div>
                <div className='w-full pl-6 py-8 items-center'>
                    <DropdownInput
                        required
                        label={"Status"}
                        className='w-1/4'
                        onChange={(e) => {
                            setValue("isActive", e.target.value === "Enabled");
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
                </div>
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
