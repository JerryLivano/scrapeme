import { useEffect } from "react";
import ButtonAction from "../Public/Button/ButtonAction";
import ModalActionForm from "../Public/Form/ModalActionForm";
import AddSiteLineInput from "../Public/Form/AddSiteLineInput";
import { useForm } from "react-hook-form";
import { MinusIcon } from "@heroicons/react/24/solid";

export default function FormModalSelection({
    open,
    setOpen,
    selection,
    index,
    updateSelection,
}) {
    const {
        register,
        watch,
        setValue,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            selection: selection || [],
        },
    });

    useEffect(() => {
        setValue("selection", selection || []);
    }, [selection, index]);

    const addSelection = () => {
        setValue("selection", [...watch("selection"), { key: "", value: "" }]);
    };

    const spliceSelection = (index) => {
        setValue(
            "selection",
            watch("selection").filter((_, i) => i !== index)
        );
    };

    const handleSave = () => {
        updateSelection(index, watch("selection"));
        setOpen(false);
    };

    return (
        <>
            <ModalActionForm
                open={open}
                setOpen={setOpen}
                titleForm={"Manage Selection"}
            >
                {watch("selection").map((item, index) => (
                    <div key={index} className='flex flex-row pb-3 border-b'>
                        <div className='flex flex-col w-11/12'>
                            <AddSiteLineInput
                                label={"Key"}
                                placeholder={"Enter selection key"}
                                className={"mt-3"}
                                customWidth={"w-3/4"}
                                {...register(`selection[${index}].key`, {
                                    required: "Key selection is required",
                                })}
                                error={
                                    formErrors.selection?.[index]?.key?.message
                                }
                            />
                            <AddSiteLineInput
                                label={"Selection"}
                                placeholder={"Enter selection value"}
                                className={"mt-2"}
                                customWidth={"w-3/4"}
                                {...register(`selection[${index}].value`, {
                                    required: "Value selection is required",
                                })}
                                error={
                                    formErrors.selection?.[index]?.value
                                        ?.message
                                }
                            />
                        </div>
                        <div className='flex w-1/12 me-2 items-center justify-center'>
                            <ButtonAction
                                onClick={() => spliceSelection(index)}
                                colorClass={"bg-red-600"}
                                hoverClass={"bg-red-400"}
                                customPadding={"px-1"}
                                text={<MinusIcon className='w-7 h-7' />}
                            />
                        </div>
                    </div>
                ))}

                <div className='mt-5 gap-x-2 flex flex-row items-center justify-end'>
                    <ButtonAction
                        onClick={addSelection}
                        colorClass={"bg-gray-500"}
                        hoverClass={"bg-gray-400"}
                        text={"Add Selection"}
                    />
                    <ButtonAction
                        onClick={handleSave}
                        colorClass={"bg-blue-800"}
                        hoverClass={"bg-blue-600"}
                        text={"Save"}
                    />
                </div>
            </ModalActionForm>
        </>
    );
}
