import { useForm } from "react-hook-form";
import NumberInput from "../../Public/Form/NumberInput";
import { useState } from "react";
import SingleLineInput from "../../Public/Form/SingleLineInput";
import DropdownInput from "../../Public/Form/DropdownInput";
import ButtonSubmitModal from "../../Public/Button/ButtonSubmitModal";
import { useScrapeWebDataMutation } from "../../../../services/scrape/scrapeApiSlice";
import { extractGuid, getAuthToken } from "../../../../utils/authUtilities";
import Spinner from "../../Public/Spinner";
import { toastError, toastSuccess } from "../../Public/Toast";
import { useNavigate } from "react-router-dom";

export default function SelectedScrapeSite({ siteData }) {
    const [urlPattern, setUrlPattern] = useState(siteData.url_pattern || []);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            limitData: siteData.limit_data || 0,
            scrapeName: "",
            inputParams:
                (siteData.url_pattern || []).map(() => ({
                    value: "",
                })) || [],
        },
    });

    const navigate = useNavigate();

    const [scrapeWebData, { isLoading: scrapeLoading }] =
        useScrapeWebDataMutation();

    const onSubmit = async (data) => {
        const updatedUrlPattern = urlPattern.map((pattern, index) => {
            if (pattern.form_id) {
                return {
                    identifier: pattern.identifier,
                    form_id: data.inputParams[index].value,
                    is_page: pattern.is_page,
                };
            }
            return pattern;
        });

        const request = {
            account_guid: extractGuid(getAuthToken()),
            site_guid: siteData.guid,
            limit_data: data.limitData,
            scrape_name: data.scrapeName,
            site_url: siteData.site_url,
            space_rule: siteData.space_rule,
            url_pattern: updatedUrlPattern,
        };

        await scrapeWebData(request)
            .unwrap()
            .then((response) => {
                if (response.data.response === 0) {
                    toastError({ message: "Failed to scrape all data" })
                } else {
                    toastSuccess({ message: "All data scraped successfully" })
                }
                navigate(`/scrape/history/${response.data.scrape_guid}`, {
                    state: {
                        scrapeGuid: response.data.scrape_guid,
                        scrapeName: response.data.scrape_name,
                        scrapeDate: response.data.created_date,
                    },
                });
            })
            .catch((e) => {
                toastError({ message: `Failed to scrape data: ${e.message}` });
            });
    };

    return (
        <>
            <main className='-mt-2'>
                <div className='sm:flex-auto'>
                    <h1 className='mb-1 text-lg font-semibold leading-6'>
                        Set Scraping Filter
                    </h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 gap-x-4 mt-4'>
                        <NumberInput
                            label={"Limit Data"}
                            required
                            maxValue={siteData.limit_data}
                            placeholder={"Enter limit data"}
                            className={"mt-5"}
                            {...register("limitData", {
                                required: "Limit data is required",
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: "Minimal limit is 1",
                                },
                                max: {
                                    value: siteData.limit_data,
                                    message: `Maximal limit is ${siteData.limit_data}`,
                                },
                            })}
                            error={formErrors.limitData?.message}
                        />
                        <SingleLineInput
                            label={"Scrape Name (optional)"}
                            className={"mt-5"}
                            placeholder={`Enter scrape name`}
                            {...register(`scrapeName`)}
                            error={formErrors.scrapeName?.message}
                        />
                    </div>
                    {siteData.url_pattern?.length > 0 ? (
                        <div className='grid grid-cols-4 gap-x-4 mt-1'>
                            {siteData.url_pattern.map((data, index) =>
                                data.form_type === 0 && !data.is_page ? (
                                    <SingleLineInput
                                        key={index}
                                        id={data.form_id}
                                        label={data.form_id
                                            .split(" ")
                                            .map(
                                                (word) =>
                                                    word
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    word.slice(1)
                                            )
                                            .join(" ")}
                                        className={"mt-5"}
                                        placeholder={`Enter ${data.form_id?.toLowerCase()}`}
                                        {...register(
                                            `inputParams[${index}].value`
                                        )}
                                        error={
                                            formErrors.inputParams?.[index]
                                                ?.value?.message
                                        }
                                    />
                                ) : data.form_type === 1 && !data.is_page ? (
                                    <DropdownInput
                                        key={index}
                                        id={data.form_id}
                                        required
                                        className={"mt-5"}
                                        label={data.form_id
                                            .split(" ")
                                            .map(
                                                (word) =>
                                                    word
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    word.slice(1)
                                            )
                                            .join(" ")}
                                        value={watch(
                                            `inputParams[${index}].value`
                                        )}
                                        placeholder={`--- Select ${
                                            data.form_id
                                                .charAt(0)
                                                .toUpperCase() +
                                            data.form_id.slice(1)
                                        } ---`}
                                        {...register(
                                            `inputParams[${index}].value`,
                                            {
                                                required: `${data.form_id?.toLowerCase()} is required`,
                                            }
                                        )}
                                        onChange={(e) =>
                                            setValue(
                                                `inputParams[${index}].value`,
                                                e.target.value
                                            )
                                        }
                                        error={
                                            formErrors.inputParams?.[index]
                                                ?.value?.message
                                        }
                                    >
                                        {data.selection.map((item) => (
                                            <option
                                                key={item.key}
                                                value={item.key}
                                            >
                                                {item.value}
                                            </option>
                                        ))}
                                    </DropdownInput>
                                ) : null
                            )}
                        </div>
                    ) : (
                        <div className='flex justify-center mt-6 font-semibold text-xl'>
                            No Pattern Available
                        </div>
                    )}
                    <div className='mt-5 flex items-center justify-end'>
                        <ButtonSubmitModal text='Scrape Now' />
                    </div>
                </form>
            </main>
            {scrapeLoading && (
                <div className='relative'>
                    <div className='fixed inset-0 z-[70] bg-gray-300 opacity-75 transition-opacity'>
                        <Spinner />
                    </div>
                </div>
            )}
        </>
    );
}
