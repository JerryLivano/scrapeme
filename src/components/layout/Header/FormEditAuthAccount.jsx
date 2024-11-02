import { useForm } from "react-hook-form";
import { useUpdateAccountMutation } from "../../../services/account/accountApiSlice";
import { useEffect, useState } from "react";
import { toastError } from "../../common/Public/Toast";
import ModalActionForm from "../../common/Public/Form/ModalActionForm";
import Spinner from "../../common/Public/Spinner";
import ButtonSubmitModal from "../../common/Public/Button/ButtonSubmitModal";
import SingleLineInput from "../../common/Public/Form/SingleLineInput";
import { useNavigate } from "react-router-dom";
import ModalConfirmEditAuth from "../../common/Public/Confirmation/ModalConfirmEditAuth";
import { removeAuthToken } from "../../../utils/authUtilities";

export default function FormEditAuthAccount({ open, setOpen, account }) {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const navigate = useNavigate();

    const [editAccount, { isLoading: editAccountLoading }] =
        useUpdateAccountMutation();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
        },
        mode: "onSubmit",
    });

    const { handleSubmit: openModal } = useForm({});

    useEffect(() => {
        if (account && account.user) {
            setValue("firstName", account.user.first_name);
            setValue(
                "lastName",
                account.user.last_name ? account.user.last_name : ""
            );
            setValue("email", account.user.email);
        }
    }, [account]);

    const onSubmit = async (data) => {
        const request = {
            guid: account.guid,
            first_name: data.firstName,
            last_name: data.lastName.trim() !== "" ? data.lastName : null,
            email: data.email,
            role_guid: account.role.guid,
            is_active: account.is_active,
        };
        await editAccount(request)
            .unwrap()
            .then(() => {
                removeAuthToken();
                navigate("/", { replace: true });
            })
            .catch((error) => {
                setShowConfirmation(false);
                if (error.status === 404) {
                    toastError({
                        message: "Email already exists",
                    });
                } else {
                    toastError({
                        message: "Failed to edit account, please try again.",
                    });
                }
                reset({
                    firstName: account.user.first_name,
                    lastName: account.user.last_name
                        ? account.user.last_name
                        : "",
                    email: account.user.email,
                });
            });
    };

    return (
        <>
            <ModalActionForm
                open={open}
                setOpen={setOpen}
                titleForm={"Edit User Account"}
            >
                <form
                    onSubmit={openModal(() => {
                        setOpen(false);
                        setShowConfirmation(true);
                    })}
                >
                    <SingleLineInput
                        label={"First Name"}
                        required
                        placeholder={"Enter first name"}
                        className={"mt-4"}
                        {...register("firstName", {
                            required: "First name is required",
                        })}
                        error={formErrors.firstName?.message}
                    />

                    <SingleLineInput
                        label={"Last Name (Optional)"}
                        placeholder={"Enter last name"}
                        className={"mt-4"}
                        {...register("lastName")}
                        error={formErrors.lastName?.message}
                    />

                    <SingleLineInput
                        label={"Email"}
                        required
                        type={"email"}
                        placeholder={"Enter email"}
                        className={"mt-4"}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Email is not valid",
                            },
                        })}
                        error={formErrors.email?.message}
                    />

                    <div className='mt-4 flex items-center justify-end'>
                        <ButtonSubmitModal text='Save' />
                    </div>
                </form>
            </ModalActionForm>

            <ModalConfirmEditAuth
                title={"Confirm Edit Auth Account"}
                message={"Please login again to update account"}
                onConfirmHandler={handleSubmit(onSubmit)}
                openModal={showConfirmation}
                setOpenModal={setShowConfirmation}
                typeButton={"submit"}
            />

            {editAccountLoading && (
                <div className='relative'>
                    <div className='fixed inset-0 z-[70] bg-gray-300 opacity-75 transition-opacity'>
                        <Spinner />
                    </div>
                </div>
            )}
        </>
    );
}
