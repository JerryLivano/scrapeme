import { useForm } from "react-hook-form";
import FormAddSiteData from "../../components/common/SitePage/FormAddSiteData";
import FormAddUrlPattern from "../../components/common/SitePage/FormAddUrlPattern";
import { useAddSiteMutation } from "../../services/site/siteApiSlice";
import { extractGuid, getAuthToken } from "../../utils/authUtilities";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../components/common/Public/Toast";
import Spinner from "../../components/common/Public/Spinner";

export default function AddSitePage() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            siteName: "",
            siteURL: "",
            spaceRule: "",
            urlPattern: [],
            dataURLPattern: [],
        },
    });

    const navigate = useNavigate();

    const [addSite, { isLoading: addSiteLoading }] = useAddSiteMutation();

    const onSubmit = async (data) => {
        const request = {
            admin_guid: extractGuid(getAuthToken()),
            site_name: data.siteName,
            site_url: data.siteURL,
            space_rule: data.spaceRule,
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
        await addSite(request)
            .unwrap()
            .then(() => {
                toastSuccess({ message: "Site successfully created" });
                navigate(-1);
            })
            .catch(() => {
                toastError({ message: "Failed to create site" });
            });
    };

    return (
        <>
            {addSiteLoading && <Spinner />}
            {!addSiteLoading && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-row gap-x-5 sm:flex-row items-start'>
                        <div className='rounded-lg bg-white p-6 w-1/2 h-auto'>
                            <FormAddSiteData
                                register={register}
                                formErrors={formErrors}
                            />
                        </div>
                        <div className='rounded-lg bg-white p-6 w-1/2 h-auto max-h-[81vh] overflow-y-auto'>
                            <FormAddUrlPattern
                                register={register}
                                formErrors={formErrors}
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}
