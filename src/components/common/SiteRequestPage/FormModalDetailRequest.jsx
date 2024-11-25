import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetAccountQuery } from "../../../services/account/accountApiSlice";
import ModalActionForm from "../Public/Form/ModalActionForm";
import Spinner from "../Public/Spinner";
import SingleLineInput from "../Public/Form/SingleLineInput";
import TextareaInput from "../Public/Form/TextareaInput";

export default function FormModalDetailRequest({ open, setOpen, siteRequest }) {
    const {
        data: account,
        isLoading,
        isSuccess,
    } = useGetAccountQuery(siteRequest.account_guid, {
        skip: !siteRequest.account_guid,
    });

    
    const { register, setValue, watch } = useForm();
    
    useEffect(() => {
        if (siteRequest) {
            setValue("subject", siteRequest.subject);
            setValue("siteUrl", siteRequest.site_url);
            setValue("description", siteRequest.description);
            setValue(
                "requestBy",
                isSuccess ? account.data.user.email : "Failed to get account"
            );
            setValue("declineReason", siteRequest.status === -1 ? siteRequest.decline_reason : null);
        }
    }, [siteRequest, account]);

    return (
        <ModalActionForm
            open={open}
            setOpen={setOpen}
            titleForm={"Site Request Detail"}
        >
            {isLoading && <Spinner />}
            {!siteRequest && (
                <div className='py-5 text-center text-xl font-semibold text-gray-700'>
                    Failed to get site request
                </div>
            )}
            {siteRequest && account && (
                <form className='mt-3 p-2 min-w-[20rem]'>
                    <SingleLineInput
                        label={"Subject"}
                        disabled
                        {...register("subject")}
                        className={"mb-6"}
                    />
                    <SingleLineInput
                        label={"Domain"}
                        disabled
                        {...register("siteUrl")}
                        className={"mb-6"}
                    />
                    <TextareaInput
                        label={"Description"}
                        disabled
                        {...register("description")}
                        className={"mb-6"}
                    />
                    <SingleLineInput
                        label={"Requested By"}
                        disabled
                        {...register("requestBy")}
                    />
                    {siteRequest.status === -1 && (
                        <TextareaInput
                            label={"Decline Reason"}
                            disabled
                            {...register("declineReason")}
                            className={"mt-6"}
                        />
                    )}
                </form>
            )}
        </ModalActionForm>
    );
}
