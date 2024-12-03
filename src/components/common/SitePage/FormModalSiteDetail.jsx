import { useEffect, useState } from "react";
import { useGetAccountQuery } from "../../../services/account/accountApiSlice";
import DetailItem from "../Public/DetailItem";
import ModalActionForm from "../Public/Form/ModalActionForm";
import Spinner from "../Public/Spinner";
import { useCreateURLSiteQuery } from "../../../services/site/siteApiSlice";

export default function FormModalSiteDetail({ siteGuid, adminGuid, open, setOpen }) {
    const {
        data: account,
        isLoading,
        isSuccess,
    } = useGetAccountQuery(adminGuid, { skip: !adminGuid || adminGuid === "" });

    const {
        data: url,
        isLoading: urlLoading,
        isSuccess: urlSuccess,
    } = useCreateURLSiteQuery(siteGuid, { skip: !siteGuid || siteGuid === ""});

    return (
        <>
            <ModalActionForm
                open={open}
                setOpen={setOpen}
                titleForm={"Site Detail"}
            >
                <DetailItem
                    label={"Admin Creator"}
                    text={
                        isSuccess
                            ? `${account.data.user.email}`
                            : "Failed to Get Admin"
                    }
                    className={"mb-5 mt-4"}
                />
                <DetailItem
                    label={"URL Pattern"}
                    text={urlSuccess ? url.data.url ? url.data.url : "No Site URL" : "Failed to Create Site URL"}
                    // className={"mb-5"}
                />
                {/* <DetailItem
                    label={"Data URL Pattern"}
                    text={urlSuccess ? url.data.data_url ? url.data.data_url : "No Data URL" : "Failed to Create Data URL"}
                /> */}
            </ModalActionForm>
            {(isLoading || urlLoading) && (
                <div className='relative'>
                    <div className='fixed inset-0 z-[70] bg-gray-300 opacity-75 transition-opacity'>
                        <Spinner />
                    </div>
                </div>
            )}
        </>
    );
}
