import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateScrapeNameMutation } from "../../../../services/scrape/scrapeApiSlice";
import { toastError, toastSuccess } from "../../Public/Toast";
import ModalActionForm from "../../Public/Form/ModalActionForm";
import Spinner from "../../Public/Spinner";
import ButtonSubmitModal from "../../Public/Button/ButtonSubmitModal";
import SingleLineInput from "../../Public/Form/SingleLineInput";

export default function FormModalEditScrape({ open, setOpen, scrape }) {
    const [updateScrape, { isLoading }] = useUpdateScrapeNameMutation();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            scrapeName: scrape.scrape_name
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (scrape) {
            setValue("scrapeName", scrape.scrape_name);
        }
    }, [scrape, open, setValue]);

    const onSubmit = async (data) => {
        const request = {
            guid: scrape.guid,
            scrape_name: data.scrapeName,
        };
        await updateScrape(request)
            .unwrap()
            .then(() => {
                toastSuccess({ message: `Successfully updated scrape name` });
            })
            .catch(() => {
                toastError({ message: "Failed to update scrape name" });
            });
        setOpen(false);
    };

    return (
        <>
            <ModalActionForm
                open={open}
                setOpen={setOpen}
                titleForm={"Edit Scrape Name"}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <SingleLineInput
                        label={"Scrape Name"}
                        required
                        placeholder={"Enter scrape name"}
                        className={"mt-4"}
                        {...register("scrapeName", {
                            required: "Scrape name is required",
                        })}
                        error={formErrors.scrapeName?.message}
                    />
                    <div className='mt-4 flex items-center justify-end'>
                        <ButtonSubmitModal text='Save' />
                    </div>
                </form>
            </ModalActionForm>
            {isLoading && (
                <div className='relative'>
                    <div className='fixed inset-0 z-[70] bg-gray-300 opacity-75 transition-opacity'>
                        <Spinner />
                    </div>
                </div>
            )}
        </>
    );
}
