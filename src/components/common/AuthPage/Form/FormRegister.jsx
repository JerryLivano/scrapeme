import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../Public/Toast";
import { useState } from "react";
import Spinner from "../../Public/Spinner";
import ShowPasswordButton from "../ShowPasswordButton";
import { useRegisterMutation } from "../../../../services/auth/authApiSlice";
import AuthInput from "../AuthInput";
import AuthButton from "../AuthButton";
import AuthErrorMessage from "../AuthErrorMessage";

export default function FormRegister() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            createdBy: "register",
            roleGuid: "6d5f72c3-a70a-41b8-93cc-2059e0dcf937",
        },
        mode: "onSubmit",
        reValidateMode: "onBlur",
    });

    const navigate = useNavigate();
    const state = useLocation();

    const [registerAccount, { isLoading }] = useRegisterMutation();

    const onSubmit = async (data) => {
        const request = {
            first_name: data.firstName,
            last_name: data.lastName !== "" ? data.lastName : null,
            email: data.email,
            password: data.password,
            confirm_password: data.confirmPassword,
            created_by: data.createdBy,
            role_guid: data.roleGuid,
        };
        await registerAccount(request)
            .unwrap()
            .then(() => {
                toastSuccess({ message: "Account created successfully" });
                navigate("/", { replace: true });
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
                message: "Failed to register, please try again",
            });
            return;
        }

        const apiError = error.data;
        if (apiError.status === 400) {
            setError("root.register", {
                type: "manual",
                message: "Failed to register account, please try again",
            });
        } else if (apiError.status === 403) {
            setError("root.register", {
                type: "manual",
                message: "Password not match",
            });
        } else if (apiError.status === 404) {
            setError("root.register", {
                type: "manual",
                message: "Account already exist",
            });
        } else {
            setError("root.register", {
                type: "manual",
                message: "Something went wrong, please try again",
            });
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div>
            {isLoading && <Spinner />}
            {!isLoading && (
                <div className='my-6 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form
                        className='space-y-6'
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <AuthInput
                            label='First Name'
                            {...register("firstName", {
                                required: "First Name is required",
                            })}
                            type='text'
                            error={errors.firstName?.message}
                            required
                        />
                        <AuthInput
                            label='Last Name (Optional)'
                            {...register("lastName")}
                            type='text'
                            error={errors.lastName?.message}
                        />
                        <AuthInput
                            label='Email'
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email is not valid",
                                },
                            })}
                            type='email'
                            error={errors.email?.message}
                            required
                        />
                        <AuthInput
                            label='Password'
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters long",
                                },
                            })}
                            type={showPassword ? "text" : "password"}
                            error={errors.password?.message}
                            endAdornment={
                                <ShowPasswordButton
                                    active={showPassword}
                                    setActive={() =>
                                        setShowPassword(!showPassword)
                                    }
                                />
                            }
                            required
                        />
                        <AuthInput
                            label='Confirm Password'
                            {...register("confirmPassword", {
                                required: "Confirm password is required",
                            })}
                            type={showConfirmPassword ? "text" : "password"}
                            error={errors.confirmPassword?.message}
                            endAdornment={
                                <ShowPasswordButton
                                    active={showConfirmPassword}
                                    setActive={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                />
                            }
                            required
                        />
                        <AuthButton text={"Register"} />
                    </form>
                    <AuthErrorMessage
                        message={errors.root?.register?.message}
                    />
                    <AuthErrorMessage
                        message={errors.root?.mutationError?.message}
                    />
                </div>
            )}
        </div>
    );
}
