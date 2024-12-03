import { useLocation, useNavigate } from "react-router-dom";
import FormEditSiteData from "../../components/common/SitePage/FormEditSiteData";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import FormEditUrlPattern from "../../components/common/SitePage/FormEditUrlPattern";
import Spinner from "../../components/common/Public/Spinner";
import { useUpdateSiteMutation } from "../../services/site/siteApiSlice";
import { toastError, toastSuccess } from "../../components/common/Public/Toast";

export default function EditSitePage() {
    const { state } = useLocation();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            guid: state?.row?.guid || "",
            siteName: state?.row?.site_name || "",
            siteURL: state?.row?.site_url.slice(12) || "",
            spaceRule: state?.row?.space_rule || "",
            limitData: state?.row?.limit_data || 1,
            urlPattern: state?.row?.url_pattern || [],
            dataURLPattern: state?.row?.data_url_pattern || [],
        },
    });

    useEffect(() => {
        if (state && state.row) {
            setValue("guid", state.row.guid);
            setValue("siteName", state.row.site_name);
            setValue("siteURL", state.row.site_url.slice(12));
            setValue("spaceRule", state.row.space_rule);
            setValue("limitData", parseInt(state.row.limit_data));
            setValue("urlPattern", state.row.url_pattern);
            setValue("dataURLPattern", state.row.data_url_pattern);
        }
    }, [state]);

    const navigate = useNavigate();

    const [editSite, { isLoading: editSiteLoading }] = useUpdateSiteMutation();

    const onSubmit = async (data) => {
        const request = {
            guid: data.guid,
            site_name: data.siteName,
            site_url: `https://www.${data.siteURL}`,
            space_rule: data.spaceRule,
            limit_data: parseInt(data.limitData),
            url_pattern: data.urlPattern.map((pattern) =>
                pattern.form_type
                    ? {
                          ...pattern,
                          form_type: parseInt(pattern.form_type, 10),
                      }
                    : {
                          ...pattern,
                      }
            ),
        };
        await editSite(request)
            .unwrap()
            .then(() => {
                toastSuccess({ message: "Site successfully edited" });
                navigate(-1);
            })
            .catch(() => {
                toastError({ message: "Failed to edit site" });
            });
    };

    return (
        <>
            {!state && editSiteLoading && <Spinner />}
            {state && !editSiteLoading && state.row && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-row gap-x-5 sm:flex-row items-start'>
                        <div className='rounded-lg bg-white p-6 w-1/2 h-auto'>
                            <FormEditSiteData
                                register={register}
                                formErrors={formErrors}
                            />
                        </div>
                        <div className='rounded-lg bg-white p-6 w-1/2 h-auto max-h-[81vh] overflow-y-auto'>
                            <FormEditUrlPattern
                                register={register}
                                watch={watch}
                                setValue={setValue}
                                formErrors={formErrors}
                            />
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}
