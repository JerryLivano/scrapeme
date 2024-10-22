import { useForm } from "react-hook-form";
import { useAddCategoryMutation } from "../../../services/category/categoryApiSlice";
import { toastError, toastSuccess } from "../Public/Toast";
import ModalActionForm from "../Public/Form/ModalActionForm";
import Spinner from "../Public/Spinner";
import SingleLineInput from "../Public/Form/SingleLineInput";
import ButtonSubmitModal from "../Public/Button/ButtonSubmitModal";

export default function FormModalAddCategory({ open, setOpen }) {
    const [addCategory, { isLoading }] = useAddCategoryMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            categoryName: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        const request = {
            category_name: data.categoryName,
        };
        await addCategory(request)
            .unwrap()
            .then(() => {
                toastSuccess({ message: `Successfully added category` });
                reset();
            })
            .catch(() => {
                toastError({ message: "Failed to add category" });
            });
        setOpen(false);
    };

    return (
        <>
            <ModalActionForm
                open={open}
                setOpen={setOpen}
                titleForm={"Add Category"}
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
                        <ButtonSubmitModal text='Add Data' />
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
