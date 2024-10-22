import { useForm } from "react-hook-form";
import {
    useGetCategoryQuery,
    useUpdateCategoryMutation,
} from "../../../services/category/categoryApiSlice";
import { useEffect } from "react";
import { toastError, toastSuccess } from "../Public/Toast";
import ModalActionForm from "../Public/Form/ModalActionForm";
import Spinner from "../Public/Spinner";
import SingleLineInput from "../Public/Form/SingleLineInput";
import ButtonSubmitModal from "../Public/Button/ButtonSubmitModal";

export default function FormModalEditCategory({ open, setOpen, category }) {
    const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            categoryName: category.category_name,
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (category) {
            setValue("categoryName", category.category_name);
        }
    }, [category, open, setValue]);

    const onSubmit = async (data) => {
        const request = {
            guid: category.guid,
            category_name: data.categoryName,
        };
        await updateCategory(request)
            .unwrap()
            .then(() => {
                toastSuccess({ message: `Successfully updated category` });
            })
            .catch(() => {
                toastError({ message: "Failed to update category" });
            });
        setOpen(false);
    };

    return (
        <>
            <ModalActionForm
                open={open}
                setOpen={setOpen}
                titleForm={"Edit Category"}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <SingleLineInput
                        label={"Category Name"}
                        required
                        placeholder={"Enter category name"}
                        className={"mt-4"}
                        {...register("categoryName", {
                            required: "Category name is required",
                        })}
                        error={formErrors.categoryName?.message}
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
