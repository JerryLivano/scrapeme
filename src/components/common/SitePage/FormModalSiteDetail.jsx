import { useEffect, useState } from "react";
import { useGetAccountQuery } from "../../../services/account/accountApiSlice";
import { useCreateURLSiteMutation } from "../../../services/site/siteApiSlice";
import DetailItem from "../Public/DetailItem";
import ModalActionForm from "../Public/Form/ModalActionForm";
import Spinner from "../Public/Spinner";

export default function FormModalSiteDetail({ site, open, setOpen }) {
    const {
        data: account,
        isLoading,
        isSuccess,
    } = useGetAccountQuery(site.admin_guid, { skip: !site.admin_guid });

    const [createURL, { isLoading: createURLLoading }] =
        useCreateURLSiteMutation();

    const [createdURL, setCreatedURL] = useState("");

    const createURLSubmit = async (siteURL, spaceRule, URLPattern) => {
        const request = {
            site_url: siteURL,
            space_rule: spaceRule,
            url_pattern: URLPattern,
        };
        try {
            const payload = await createURL(request).unwrap();
            console.log(payload);
            setCreatedURL(payload.data);
        } catch (error) {
            console.error("Error creating URL:", error);
        }
    };

    useEffect(() => {
        createURLSubmit(site.site_url, site.space_rule, site.url_pattern);
    }, [site]);

    return (
        <>
            <ModalActionForm
                open={open}
                setOpen={setOpen}
                titleForm={"Site Detail"}
            >
                <DetailItem
                    label={"Admin"}
                    text={
                        isSuccess
                            ? `${account.data.user.first_name} ${account.data.user.last_name}`
                            : "Failed to Get Admin"
                    }
                />
                <DetailItem
                    label={"URL Pattern"}
                    text={createdURL ? createdURL : "No URL Pattern Created"}
                />
                <DetailItem
                    label={"Data URL Pattern"}
                    text={createdURL ? createdURL.data : "No Data URL Pattern"}
                />
            </ModalActionForm>
            {(isLoading || createURLLoading) && (
                <div className='relative'>
                    <div className='fixed inset-0 z-[70] bg-gray-300 opacity-75 transition-opacity'>
                        <Spinner />
                    </div>
                </div>
            )}
        </>
    );
}
