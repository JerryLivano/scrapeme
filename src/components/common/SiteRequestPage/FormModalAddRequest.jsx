import { useForm } from "react-hook-form";
import { useAddRequestMutation } from "../../../services/siteRequest/siteRequestApiSlice";
import { toastError, toastSuccess } from "../Public/Toast";
import Spinner from "../Public/Spinner";
import ModalActionForm from "../Public/Form/ModalActionForm";
import SingleLineInput from "../Public/Form/SingleLineInput";
import TextareaInput from "../Public/Form/TextareaInput";
import ButtonSubmitModal from "../Public/Button/ButtonSubmitModal";

export default function FormModalAddRequest({ open, setOpen, userGuid }) {
    const [addRequest, { isLoading: addRequestLoading }] =
        useAddRequestMutation();

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            subject: "",
            siteURL: "",
            description: "",
        },
        mode: "onSubmit",
    });

    const onSubmit = async (data) => {
        const request = {
            account_guid: userGuid,
            subject: data.subject,
            site_url: data.siteURL,
            description: data.description,
        };
        await addRequest(request)
            .unwrap()
            .then(() => {
                toastSuccess({ message: "Site request successfully created" });
                setOpen(false);
            })
            .catch(() => {
                toastError({ message: "Failed to create site request" });
            });
    };

    return (
        <>
            <ModalActionForm
                open={open}
                setOpen={setOpen}
                titleForm={"Add Site Request"}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <SingleLineInput
                        label={"Subject"}
                        required
                        placeholder={"Enter Subject"}
                        className={"mt-4"}
                        {...register("subject", {
                            required: "Subject is required",
                        })}
                        error={formErrors.subject?.message}
                    />
                    <SingleLineInput
                        label={"Domain"}
                        required
                        placeholder={"Enter Domain (ex: raywhite.co.id)"}
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
                        <ButtonSubmitModal text='Add Data' />
                    </div>
                </form>
            </ModalActionForm>
            {addRequestLoading && (
                <div className='relative'>
                    <div className='fixed inset-0 z-[70] bg-gray-300 opacity-75 transition-opacity'>
                        <Spinner />
                    </div>
                </div>
            )}
        </>
    );
}
