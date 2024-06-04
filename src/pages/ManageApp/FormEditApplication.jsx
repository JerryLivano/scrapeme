import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import DropdownInput from "../../components/elements/Input/DropdownInput";
import ImageCropper from "../../components/elements/Image/ImageCropper";
import { Button } from "../../components";
import DropzoneInput from "../../components/elements/Input/DropzoneInput";
import ButtonText from "../../components/elements/Button/ButtonText";
import ModalConfirmAddData from "../../components/elements/Confirmation/ModalConfirmAddData";
import {
    toastError,
    toastSuccess,
} from "../../components/elements/Alert/Toast";
import { useUpdateApplicationMutation } from "../../services/applicationApiSlice";
import Spinner from "../../components/elements/Spinner/Spinner";
import SingleLineInput from "../../components/elements/Input/SIngleLineInput";

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
    const [showModal, setShowModal] = useState(false);
    const [showImageCropper, setShowImageCropper] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

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

    const [updateApplication, { isLoading: updateAppLoading }] =
        useUpdateApplicationMutation();

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

        if (imageFile) {
            localStorage.setItem("updatelogo", imageFile.name); // Storing the filename
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setShowImageCropper(true);
            setValue("logo", file.name);
        }
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
                        <table className='w-full'>
                            <tr className='border-b-2 items-center'>
                                <td className='font-semibold text-lg px-8'>
                                    <label htmlFor='name'>
                                        Application Name
                                    </label>
                                </td>
                                <td className='w-full flex py-6'>
                                    <div className='flex'>
                                        <SingleLineInput
                                            {...register("name")}
                                            error={formErrors.name?.message}
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
                                <td className='w-full flex justify-between py-6'>
                                    <DropzoneInput urlImage={watch("logo")} />
                                    <div className='mr-20'>
                                        <ButtonText
                                            text={"Change"}
                                            type={"button"}
                                            onClick={() =>
                                                fileInputRef.current.click()
                                            }
                                        />
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
                                </td>
                            </tr>
                        </table>
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
                </div>
            )}
            <input
                type='file'
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept='image/*'
            />
            {showImageCropper && (
                <ImageCropper
                    closeModal={() => setShowImageCropper(false)}
                    updateAvatar={(croppedImage, imageFile) => {
                        setValue("logo", imageFile);
                        setShowImageCropper(false);
                    }}
                    file={imageFile}
                />
            )}

            {/* <script>
                document.querySelector
            </script> */}
        </>
    );
}
