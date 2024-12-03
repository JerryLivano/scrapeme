import { useForm } from "react-hook-form";
import {
    useAddTemplateMutation,
    useEditTemplateMutation,
    useGetTemplateSiteQuery,
} from "../../../services/template/templateApiSlice";
import { toastError, toastSuccess } from "../Public/Toast";
import ModalActionForm from "../Public/Form/ModalActionForm";
import Spinner from "../Public/Spinner";
import ButtonSubmitModal from "../Public/Button/ButtonSubmitModal";
import TemplateLineInput from "../Public/Form/TemplateLineInput";
import { useEffect, useState } from "react";
import AddSiteLineInput from "../Public/Form/AddSiteLineInput";
import ButtonAction from "../Public/Button/ButtonAction";
import { MinusIcon } from "@heroicons/react/24/solid";
import TemplateDropdown from "../Public/Form/TemplateDropdown";

export default function FormModalManageTemplate({ open, setOpen, siteGuid }) {
    const {
        data: template,
        isSuccess: templateSuccess,
        isLoading: templateLoading,
    } = useGetTemplateSiteQuery(siteGuid, { skip: !siteGuid });

    const [addTemplate, { isLoading: addLoading }] = useAddTemplateMutation();
    const [editTemplate, { isLoading: editLoading }] =
        useEditTemplateMutation();

    const [editState, setEditState] = useState(false);
    const [checkbox, setCheckbox] = useState([false, false, false]);

    const handleCheckbox = (index) => {
        setCheckbox([false, false, false]);
        setCheckbox((prev) =>
            prev.map((item, i) => (i === index ? !item : item))
        );
    };

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            guid: "",
            container: "",
            isClass: false,
            isId: false,
            isTag: false,
            tagData: [],
        },
        mode: "onChange",
    });

    useEffect(() => {
        setEditState(false);
        setCheckbox([false, false, false]);
        reset();
        if (template) {
            if (!templateLoading) {
                if (template.data && templateSuccess) {
                    setValue("guid", template.data.guid);
                    setValue("container", template.data.container);
                    setValue("isClass", template.data.is_class);
                    setValue("isId", template.data.is_id);
                    setValue("isTag", template.data.is_tag);
                    setValue("tagData", template.data.tag_data);
                    setEditState(true);
                    setCheckbox([
                        template.data.is_id,
                        template.data.is_class,
                        template.data.is_tag,
                    ]);
                }
            }
        }
    }, [template, siteGuid, open]);

    const tagData = watch("tagData") || [];

    const tagTypeOpt = [
        { value: 0, label: "Class" },
        { value: 1, label: "Id" },
        { value: 2, label: "Tag" },
    ];

    useEffect(() => {
        setValue("isId", checkbox[0]);
        setValue("isClass", checkbox[1]);
        setValue("isTag", checkbox[2]);
    }, [checkbox]);

    const addTagData = () => {
        const updatedTagData = [
            ...tagData,
            { title: "", identifier: "", type: 0, is_image: false },
        ];
        setValue("tagData", updatedTagData);
    };

    const spliceTagData = (index) => {
        const updatedTagData = tagData.filter((_, i) => i !== index);
        setValue("tagData", updatedTagData);
    };

    const toggleCheckbox = (index) => {
        setValue(
            `tagData[${index}].is_image`,
            !watch(`tagData[${index}].is_image`)
        );
    };

    const onSubmit = async (data) => {
        const checkedCount = checkbox.filter((isChecked) => isChecked).length;

        if (checkedCount !== 1) {
            toastError({
                message: "Please select exactly one checkbox.",
            });
            return;
        }

        if (editState) {
            const request = {
                guid: data.guid,
                container: data.container,
                is_class: data.isClass,
                is_id: data.isId,
                is_tag: data.isTag,
                tag_data: data.tagData.map((tag) => ({
                    ...tag,
                    type: parseInt(tag.type, 10),
                })),
            };
            await editTemplate(request)
                .unwrap()
                .then(() => {
                    toastSuccess({ message: "Successfully edited template" });
                    reset();
                })
                .catch(() => {
                    toastError({ message: "Failed to edit template" });
                });
            setOpen(false);
        } else {
            const request = {
                container: data.container,
                is_class: data.isClass,
                is_id: data.isId,
                is_tag: data.isTag,
                site_guid: siteGuid,
                tag_data: data.tagData.map((tag) => ({
                    ...tag,
                    type: parseInt(tag.type, 10),
                })),
            };
            await addTemplate(request)
                .unwrap()
                .then(() => {
                    toastSuccess({ message: "Successfully added template" });
                    reset();
                })
                .catch(() => {
                    toastError({ message: "Failed to add template" });
                });
            setOpen(false);
        }
        reset();
    };

    return (
        <>
            <ModalActionForm
                open={open}
                setOpen={setOpen}
                titleForm={"Manage Template"}
            >
                {templateLoading && <Spinner />}
                {!templateLoading && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TemplateLineInput
                            label={"Container Identifier"}
                            required
                            placeholder={"Enter container identifier"}
                            className={"mt-4 mb-6"}
                            checked={checkbox}
                            setChecked={handleCheckbox}
                            {...register("container", {
                                required: "Container identifier is required",
                            })}
                            error={formErrors.container?.message}
                        />

                        {tagData.map((_, index) => (
                            <div key={index} className='pb-3 border-t'>
                                <AddSiteLineInput
                                    label={"Column"}
                                    required
                                    placeholder={"Enter column title"}
                                    className={"mt-3"}
                                    {...register(`tagData[${index}].title`, {
                                        required: "Column title is required",
                                    })}
                                    error={
                                        formErrors.tagData?.[index]?.title
                                            ?.message
                                    }
                                />
                                <AddSiteLineInput
                                    label={"Identifier"}
                                    required
                                    placeholder={
                                        "Enter tag identifier (class/id/tag)"
                                    }
                                    className={"mt-2"}
                                    {...register(
                                        `tagData[${index}].identifier`,
                                        {
                                            required:
                                                "Identifier tag data is required",
                                        }
                                    )}
                                    error={
                                        formErrors.tagData?.[index]?.identifier
                                            ?.message
                                    }
                                />
                                <TemplateDropdown
                                    label={"Tag Attribute"}
                                    required
                                    className={"mt-2"}
                                    checkboxLabel={"Is Image?"}
                                    checked={watch(
                                        `tagData[${index}].is_image`
                                    )}
                                    setChecked={() => toggleCheckbox(index)}
                                    value={watch(`tagData[${index}].type`)}
                                    {...register(`tagData[${index}].type`)}
                                    onChange={(e) =>
                                        setValue(
                                            `tagData[${index}].type`,
                                            parseInt(e.target.value, 10)
                                        )
                                    }
                                    error={
                                        formErrors.tagData?.[index]?.type
                                            ?.message
                                    }
                                >
                                    {tagTypeOpt.map((item) => (
                                        <option
                                            key={item.value}
                                            value={item.value}
                                            selected={
                                                item.value ===
                                                watch(`tagData[${index}].type`)
                                            }
                                        >
                                            {item.label}
                                        </option>
                                    ))}
                                </TemplateDropdown>
                                <div className='flex flex-row justify-end mt-2'>
                                    <ButtonAction
                                        onClick={() => spliceTagData(index)}
                                        colorClass={"bg-red-600"}
                                        hoverClass={"bg-red-400"}
                                        customPadding={"px-1"}
                                        text={<MinusIcon className='w-7 h-7' />}
                                    />
                                </div>
                            </div>
                        ))}

                        <div className='mt-4 flex flex-row items-center gap-x-2 justify-end'>
                            <ButtonAction
                                onClick={addTagData}
                                colorClass={"bg-gray-500"}
                                hoverClass={"bg-gray-400"}
                                text={"Add Tag"}
                            />
                            <ButtonSubmitModal
                                text={editState ? "Save" : "Add Data"}
                            />
                        </div>
                    </form>
                )}
            </ModalActionForm>
            {(addLoading || editLoading) && (
                <div className='relative'>
                    <div className='fixed inset-0 z-[70] bg-gray-300 opacity-75 transition-opacity'>
                        <Spinner />
                    </div>
                </div>
            )}
        </>
    );
}
