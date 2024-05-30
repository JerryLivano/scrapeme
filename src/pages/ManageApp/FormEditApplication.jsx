import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SingleLineInput from "../../components/elements/Input/SIngleLineInput";
import DropdownInput from "../../components/elements/Input/DropdownInput";
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
                ? application.url.replace(/^https?:\/\//, "").replace(/\/$/, '')
                : "",
            logo: application.photo || "",
            status: application.isActive || false,
        },
    });

    console.log(application.isActive);

    const { handleSubmit: handleSubmitOpenModal } = useForm({});

    const [selectedStatus, setSelectedStatus] = useState(application.isActive);
    const [showModal, setShowModal] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const statusOptions = [
        { isActive: true, status: "Enabled" },
        { isActive: false, status: "Disabled" },
    ];

    useEffect(() => {
        if (!application) return;
        setValue("name", application.name);
        setValue(
            "url",
            application.url ? application.url.replace(/^https?:\/\//, "").replace(/\/$/, '') : ""
        );
        setValue("logo", application.photo);
        setValue("status", application.isActive);
    }, [application, setValue]);

    const [updateApplication, { isLoading: updateAppLoading }] =
        useUpdateApplicationMutation();

    const onUpdateApplication = async (data) => {
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
            url: `https://${data.url.trim().replace(/^https?:\/\//, "").replace(/\/$/, '')}`,
            isActive: data.status === "true" ? true : false,
        };

        try {
            await updateApplication(request).unwrap();
            toastSuccess({ message: "Successfully updated application" });
        } catch (error) {
            toastError({ message: error.message });
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
                        onSubmit={handleSubmitOpenModal(() =>
                            setShowModal(true)
                        )}
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
                                        value={selectedStatus}
                                        onChange={(e) => {
                                            setSelectedStatus(e.target.value);
                                            setValue("status", e.target.value);
                                        }}
                                    >
                                        {statusOptions.map((status) => (
                                            <option
                                                key={status.isActive}
                                                value={status.isActive}
                                            >
                                                {status.status}
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
                    <ModalConfirmAddData
                        title={"Confirm Update Application"}
                        message={`Are you sure want to update ${application.name}?`}
                        onConfirmHandler={handleSubmit(onUpdateApplication)}
                        openModal={showModal}
                        setOpenModal={setShowModal}
                        typeButton={"submit"}
                    />
                </div>
            )}
        </>
    );
}
