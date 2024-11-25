import { useForm } from "react-hook-form";
import { useUpdateRequestMutation } from "../../../services/siteRequest/siteRequestApiSlice";
import { useEffect } from "react";
import { toastError, toastSuccess } from "../Public/Toast";
import Spinner from "../Public/Spinner";
import ButtonSubmitModal from "../Public/Button/ButtonSubmitModal";
import ModalActionForm from "../Public/Form/ModalActionForm";
import TextareaInput from "../Public/Form/TextareaInput";
import SingleLineInput from "../Public/Form/SingleLineInput";

export default function FormModalEditRequest({ open, setOpen, siteRequest }) {
    const [updateRequest, { isLoading: updateRequestLoading }] =
        useUpdateRequestMutation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            subject: siteRequest.subject,
            siteURL: siteRequest.site_url,
            description: siteRequest.description,
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (siteRequest) {
            setValue("subject", siteRequest.subject);
            setValue("siteURL", siteRequest.site_url);
            setValue("description", siteRequest.description);
        }
    }, [siteRequest]);

    const onSubmit = async (data) => {
        const request = {
            guid: siteRequest.guid,
            subject: data.subject,
            site_url: data.siteURL,
            description: data.description,
        };
        await updateRequest(request)
            .unwrap()
            .then(() => {
                toastSuccess({ message: "Successfully updated site request" });
            })
            .catch(() => {
                toastError({ message: "Failed to update site request" });
            });
        setOpen(false);
    };

    return (
        <>
            <ModalActionForm
                open={open}
                setOpen={setOpen}
                titleForm={"Edit Site Request"}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <SingleLineInput
                        label={"Subject"}
                        required
                        placeholder={"Enter subject"}
                        className={"mt-4"}
                        {...register("subject", {
                            required: "Subject is required",
                        })}
                        error={formErrors.subject?.message}
                    />
                    <SingleLineInput
                        label={"Domain"}
                        required
                        placeholder={"Enter domain (ex: raywhite.co.id)"}
                        className={"mt-4"}
                        {...register("siteURL", {
                            required: "Domain is required",
                        })}
                        error={formErrors.siteURL?.message}
                    />
                    <TextareaInput
                        label={"Description"}
                        required
                        className={"mt-4"}
                        {...register("description", {
                            required: "Description is required",
                        })}
                        error={formErrors.description?.message}
                    />

                    <div className='mt-4 flex items-center justify-end'>
                        <ButtonSubmitModal text='Save' />
                    </div>
                </form>
            </ModalActionForm>
            {updateRequestLoading && (
                <div className='relative'>
                    <div className='fixed inset-0 z-[70] bg-gray-300 opacity-75 transition-opacity'>
                        <Spinner />
                    </div>
                </div>
            )}
        </>
    );
}
