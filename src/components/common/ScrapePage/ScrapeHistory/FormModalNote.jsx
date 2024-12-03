import { useForm } from "react-hook-form";
import { useUpdateNoteWebDataMutation } from "../../../../services/scrape/scrapeApiSlice";
import ButtonSubmitModal from "../../Public/Button/ButtonSubmitModal";
import ModalActionForm from "../../Public/Form/ModalActionForm";
import TextareaInput from "../../Public/Form/TextareaInput";
import Spinner from "../../Public/Spinner";
import { useEffect } from "react";
import { toastError, toastSuccess } from "../../Public/Toast";

export default function FormModalNote({ open, setOpen, guid, selectedScrape }) {
    const { setValue, handleSubmit, register } = useForm({
        defaultValues: {
            guid: guid,
            index: selectedScrape.index || -1,
            note: selectedScrape.note || "",
        },
    });

    useEffect(() => {
        if (selectedScrape) {
            setValue("index", selectedScrape.index);
            setValue("note", selectedScrape.note);
        }
    }, [selectedScrape]);

    const [updateNote, { isLoading: updateNoteLoading }] =
        useUpdateNoteWebDataMutation();

    const onSubmit = async (data) => {
        const request = {
            guid: data.guid,
            index: data.index,
            note: data.note,
        };
        await updateNote(request)
            .unwrap()
            .then(() => {
                toastSuccess({ message: "Successfully updated note" });
            })
            .catch(() => {
                toastError({ message: "Error updating note" });
            });
    };

    return (
        <ModalActionForm
            open={open}
            setOpen={setOpen}
            titleForm={"Note"}
        >
            {updateNoteLoading && <Spinner />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextareaInput
                    {...register("note")}
                    className={"mt-4"}
                    inputClassName={"h-56"}
                />
                <div className='mt-4 flex items-center justify-end'>
                    <ButtonSubmitModal text={"Save"} />
                </div>
            </form>
        </ModalActionForm>
    );
}
