import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../../../services/account/accountApiSlice";
import { toastSuccess } from "../Public/Toast";
import ModalActionForm from "../Public/Form/ModalActionForm";
import { useState } from "react";
import SingleLinePasswordInput from "../Public/Form/SingleLinePasswordInput";
import ButtonShowPassword from "../Public/Button/ButtonShowPassword";
import ButtonSubmitModal from "../Public/Button/ButtonSubmitModal";
import AuthErrorMessage from "../AuthPage/AuthErrorMessage";
import Spinner from "../Public/Spinner";

export default function FormModalChangePassword({
    accountGuid,
    open,
    setOpen,
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [changePassword, { isLoading: changePasswordLoading }] =
        useChangePasswordMutation();

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        mode: "onSubmit",
    });

    const onSubmit = async (data) => {
        const request = {
            guid: accountGuid,
            password: data.password,
            confirm_password: data.confirmPassword,
        };
        await changePassword(request)
            .unwrap()
            .then(() => {
                toastSuccess({ message: "Password changed successfully" });
                setOpen(false);
                reset();
            })
            .catch((error) => {
                handleError(error);
            });
    };

    const handleError = (error) => {
        if (!error || !("status" in error)) return;
        if ("error" in error) {
            setError("root.mutationError", {
                type: error.status,
                message: "Failed to change password, please try again",
            });
            return;
        }

        const apiError = error.data;
        if (apiError.status === 400) {
            setError("root.changePw", {
                type: "manual",
                message: "Failed to change password, please try again",
            });
        } else if (apiError.status === 403) {
            setError("root.changePw", {
                type: "manual",
                message: "Password not match",
            });
        } else {
            setError("root.changePw", {
                type: "manual",
                message: "Something went wrong, please try again",
            });
        }
    };

    return (
        <>
            <ModalActionForm
                open={open}
                setOpen={setOpen}
                titleForm={"Change Password"}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <SingleLinePasswordInput
                        label={"Password"}
                        required
                        placeholder={"Enter password"}
                        className={"mt-4"}
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters long",
                            },
                        })}
                        type={showPassword ? "text" : "password"}
                        error={formErrors.password?.message}
                        endAdornment={
                            <ButtonShowPassword
                                active={showPassword}
                                setActive={() => setShowPassword(!showPassword)}
                            />
                        }
                    />
                    <SingleLinePasswordInput
                        label={"Confirm Password"}
                        required
                        placeholder={"Enter confirm password"}
                        className={"mt-4"}
                        {...register("confirmPassword", {
                            required: "Confirm password is required",
                        })}
                        type={showConfirmPassword ? "text" : "password"}
                        error={formErrors.confirmPassword?.message}
                        endAdornment={
                            <ButtonShowPassword
                                active={showConfirmPassword}
                                setActive={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            />
                        }
                    />
                    <AuthErrorMessage
                        message={formErrors.root?.changePw?.message}
                    />
                    <AuthErrorMessage
                        message={formErrors.root?.mutationError?.message}
                    />
                    <div className='mt-4 flex items-center justify-end'>
                        <ButtonSubmitModal text='Change Password' />
                    </div>
                </form>
            </ModalActionForm>
            {changePasswordLoading && (
                <div className='relative'>
                    <div className='fixed inset-0 z-[70] bg-gray-300 opacity-75 transition-opacity'>
                        <Spinner />
                    </div>
                </div>
            )}
        </>
    );
}
