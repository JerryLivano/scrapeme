import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ModalActionForm from "../../Public/Form/ModalActionForm";
import AddSiteLineInput from "../../Public/Form/AddSiteLineInput";
import ButtonAction from "../../Public/Button/ButtonAction";

export default function FormModalChildTag({
    open,
    setOpen,
    childType,
    childTag,
    childIdentifier,
    index,
    updateChild,
}) {
    const {
        register,
        watch,
        setValue,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            childTag: childTag || "",
            childType: childType || "",
            childIdentifier: childIdentifier || "",
        },
    });

    useEffect(() => {
        if (watch("childType") === "") {
            setValue("childIdentifier", "");
        }
    }, [watch("childType")]);

    useEffect(() => {
        setValue("childIdentifier", childIdentifier || "");
        setValue("childTag", childTag || "");
        setValue("childType", childType || "");
    }, [childTag, childType, childIdentifier, index]);

    const handleSave = () => {
        updateChild(
            index,
            watch("childType"),
            watch("childTag"),
            watch("childIdentifier")
        );
        setOpen(false);
    };

    return (
        <>
            <ModalActionForm
                open={open}
                setOpen={setOpen}
                titleForm={"Manage Child Tag"}
            >
                <div className='flex flex-col w-full'>
                    <AddSiteLineInput
                        label={"Tag Type"}
                        required
                        placeholder={"Enter child tag type"}
                        className={"mt-2"}
                        customWidth={"w-full"}
                        {...register("childTag", {
                            required: "Enter child tag type",
                        })}
                        error={formErrors.childTag?.message}
                    />
                    <AddSiteLineInput
                        label={"Attribute"}
                        placeholder={"Enter child tag attribute"}
                        className={"mt-3"}
                        customWidth={"w-full"}
                        {...register("childType", {
                            required: "Enter child tag attribute",
                        })}
                        error={formErrors.childType?.message}
                    />
                    {watch("childType").trim() !== "" && (
                        <AddSiteLineInput
                            label={"Identifier"}
                            placeholder={"Enter child tag identifier"}
                            className={"mt-3"}
                            customWidth={"w-full"}
                            {...register("childIdentifier", {
                                required: "Enter child tag identifier",
                            })}
                            error={formErrors.childIdentifier?.message}
                        />
                    )}
                    <div className='mt-3 gap-x-2 flex flex-row items-center justify-end'>
                        <ButtonAction
                            onClick={handleSave}
                            colorClass={"bg-blue-800"}
                            hoverClass={"bg-blue-600"}
                            text={"Save"}
                        />
                    </div>
                </div>
            </ModalActionForm>
        </>
    );
}
