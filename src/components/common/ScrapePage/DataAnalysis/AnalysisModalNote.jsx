import { useForm } from "react-hook-form";
import ModalActionForm from "../../Public/Form/ModalActionForm";
import TextareaInput from "../../Public/Form/TextareaInput";
import { useEffect } from "react";

export default function AnalysisModalNote({
    open,
    setOpen,
    selectedScrape,
}) {
    const { setValue, register } = useForm({
        defaultValues: {
            note: selectedScrape.note || "",
        },
    });

    useEffect(() => {
        if (selectedScrape) {
            setValue("note", selectedScrape.note);
        }
    }, [selectedScrape]);

    return (
        <ModalActionForm open={open} setOpen={setOpen} titleForm={"Note"}>
            <form>
                <TextareaInput
                    {...register("note")}
                    className={"mt-4"}
                    inputClassName={"h-56"}
                    disabled
                />
            </form>
        </ModalActionForm>
    );
}
