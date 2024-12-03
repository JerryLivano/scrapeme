import { useEffect, useState } from "react";
import {
    useAddTemplateMutation,
    useEditTemplateMutation,
    useGetTemplateSiteQuery,
} from "../../../../services/template/templateApiSlice";
import { useForm } from "react-hook-form";
import Spinner from "../../Public/Spinner";
import ButtonSubmitModal from "../../Public/Button/ButtonSubmitModal";
import ButtonAction from "../../Public/Button/ButtonAction";
import { MinusIcon } from "@heroicons/react/24/solid";
import TemplateDropdown from "../../Public/Form/TemplateDropdown";
import AddSiteLineInput from "../../Public/Form/AddSiteLineInput";
import TemplateLineInput from "../../Public/Form/TemplateLineInput";
import { toastError, toastSuccess } from "../../Public/Toast";
import { useNavigate } from "react-router-dom";
import SingleLineInput from "../../Public/Form/SingleLineInput";

export default function FormManageTemplate({ siteGuid }) {
    const {
        data: template,
        isSuccess: templateSuccess,
        isLoading: templateLoading,
    } = useGetTemplateSiteQuery(siteGuid, { skip: !siteGuid });

    const [addTemplate, { isLoading: addLoading }] = useAddTemplateMutation();
    const [editTemplate, { isLoading: editLoading }] =
        useEditTemplateMutation();

    const [editState, setEditState] = useState(false);
    const [checkbox, setCheckbox] = useState([false, false]);
    const navigate = useNavigate();

    const handleCheckbox = (index) => {
        setCheckbox([false, false]);
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
            containerTag: "",
            isClass: false,
            isId: false,
            tagData: [],
        },
        mode: "onChange",
    });

    useEffect(() => {
        setEditState(false);
        setCheckbox([false, false]);
        reset();
        if (template) {
            if (!templateLoading) {
                if (template.data && templateSuccess) {
                    setValue("guid", template.data.guid);
                    setValue("container", template.data.container);
                    setValue("containerTag", template.data.container_tag);
                    setValue("isClass", template.data.is_class);
                    setValue("isId", template.data.is_id);
                    setValue("tagData", template.data.tag_data);
                    setEditState(true);
                    setCheckbox([template.data.is_id, template.data.is_class]);
                }
            }
        }
    }, [template, siteGuid, window.location.href === "/site/template"]);

    const tagData = watch("tagData") || [];

    useEffect(() => {
        setValue("isId", checkbox[0]);
        setValue("isClass", checkbox[1]);
    }, [checkbox]);

    const addTagData = () => {
        const updatedTagData = [
            ...tagData,
            { title: "", identifier: "", type: "", tag: "" },
        ];
        setValue("tagData", updatedTagData);
    };

    const spliceTagData = (index) => {
        const updatedTagData = tagData.filter((_, i) => i !== index);
        setValue("tagData", updatedTagData);
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
                container_tag: data.containerTag,
                is_class: data.isClass,
                is_id: data.isId,
                tag_data: data.tagData.map((tag) => ({
                    ...tag,
                    type: tag.type.trim().toLowerCase(),
                })),
            };
            await editTemplate(request)
                .unwrap()
                .then(() => {
                    toastSuccess({ message: "Successfully edited template" });
                    reset();
                    navigate(-1);
                })
                .catch(() => {
                    toastError({ message: "Failed to edit template" });
                });
        } else {
            const request = {
                container: data.container,
                container_tag: data.containerTag,
                is_class: data.isClass,
                is_id: data.isId,
                site_guid: siteGuid,
                tag_data: data.tagData.map((tag) => ({
                    ...tag,
                    type: tag.type.trim().toLowerCase(),
                })),
            };
            await addTemplate(request)
                .unwrap()
                .then(() => {
                    toastSuccess({ message: "Successfully added template" });
                    reset();
                    navigate(-1);
                })
                .catch(() => {
                    toastError({ message: "Failed to add template" });
                });
        }
        reset();
    };

    return (
        <>
            <div className='text-xl border-b pb-4 font-semibold text-gray-900'>
                Manage Template
            </div>

            {templateLoading && <Spinner />}
            {!templateLoading && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TemplateLineInput
                        label={"Container Identifier"}
                        required
                        placeholder={"Enter container identifier"}
                        className={"mt-4"}
                        checked={checkbox}
                        setChecked={handleCheckbox}
                        {...register("container", {
                            required: "Container identifier is required",
                        })}
                        error={formErrors.container?.message}
                    />

                    <SingleLineInput
                        label={"Container Tag"}
                        required
                        placeholder={"Enter container identifier"}
                        className={"mt-4 mb-6"}
                        {...register("containerTag", {
                            required: "Container tag is required",
                        })}
                        error={formErrors.containerTag?.message}
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
                                    formErrors.tagData?.[index]?.title?.message
                                }
                            />
                            <AddSiteLineInput
                                label={"Tag Type"}
                                required
                                placeholder={"Enter HTML tag type"}
                                className={"mt-2"}
                                {...register(`tagData[${index}].tag`, {
                                    required: "Enter HTML tag type",
                                })}
                                error={
                                    formErrors.tagData?.[index]?.tag?.message
                                }
                            />
                            <AddSiteLineInput
                                label={"Tag Attribute"}
                                className={"mt-2"}
                                placeholder={"Enter Attribute type (lowercase)"}
                                {...register(`tagData[${index}].type`)}
                                error={
                                    formErrors.tagData?.[index]?.type?.message
                                }
                            />
                            {watch(`tagData[${index}].type`).trim() !== "" && (
                                <AddSiteLineInput
                                    label={"Identifier"}
                                    required
                                    placeholder={
                                        "Enter tag identifier (class/id)"
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
                            )}

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
