import ButtonSubmitModal from "../Public/Button/ButtonSubmitModal";
import SingleLineInput from "../Public/Form/SingleLineInput";
import EditSiteInformation from "./EditSiteInformation";

export default function FormEditSiteData({ register, formErrors }) {
    return (
        <>
            <div className='text-xl border-b pb-4 font-semibold text-gray-900'>
                Edit Site Data
            </div>
            <div className='mt-5'>
                <EditSiteInformation />
            </div>
            <div className='mt-5'>
                <SingleLineInput
                    label={"Site Name"}
                    required
                    placeholder={"Enter site name"}
                    className={"mt-5"}
                    {...register("siteName", {
                        required: "Site name is required",
                    })}
                    error={formErrors.siteName?.message}
                />

                <SingleLineInput
                    label={"Domain"}
                    required
                    placeholder={"Enter domain name"}
                    className={"mt-5"}
                    {...register("siteURL", {
                        required: "Domain name is required",
                    })}
                    error={formErrors.siteURL?.message}
                />

                <SingleLineInput
                    label={"Space Rule"}
                    required
                    placeholder={"Enter space rule"}
                    className={"mt-5"}
                    {...register("spaceRule", {
                        required: "Space rule is required",
                    })}
                    error={formErrors.spaceRule?.message}
                />

                <div className='mt-6 flex items-center justify-end'>
                    <ButtonSubmitModal text='Save' />
                </div>
            </div>
        </>
    );
}
