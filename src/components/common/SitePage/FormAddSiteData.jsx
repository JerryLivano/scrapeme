import ButtonSubmitModal from "../Public/Button/ButtonSubmitModal";
import NumberInput from "../Public/Form/NumberInput";
import SingleLineInput from "../Public/Form/SingleLineInput";
import AddSiteInformation from "./AddSiteInformation";

export default function FormAddSiteData({ register, formErrors }) {
    return (
        <>
            <div className='text-xl border-b pb-4 font-semibold text-gray-900'>
                Add Site Data
            </div>
            <div className='mt-5'>
                <AddSiteInformation />
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
                    startAdornment={"https://www."}
                    placeholder={"Enter domain name"}
                    className={"mt-5"}
                    {...register("siteURL", {
                        required: "Domain name is required",
                    })}
                    error={formErrors.siteURL?.message}
                />

                <div className='flex flex-row gap-x-4'>
                    <div className='w-1/2'>
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
                    </div>
                    <div className='w-1/2'>
                        <NumberInput
                            label={"Limit Data"}
                            required
                            placeholder={"Enter limit data"}
                            className={"mt-5"}
                            {...register("limitData", {
                                required: "Limit data is required",
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: "Minimal limit is 1"
                                }
                            })}
                            error={formErrors.limitData?.message}
                        />
                    </div>
                </div>

                <div className='mt-6 flex items-center justify-end'>
                    <ButtonSubmitModal text='Add Data' />
                </div>
            </div>
        </>
    );
}
