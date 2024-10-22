import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuthToken } from "../../../../utils/authUtilities";
import { toastError, toastSuccess } from "../../Public/Toast";
import { useState } from "react";
import Spinner from "../../Public/Spinner";
import ShowPasswordButton from "../ShowPasswordButton";
import { useLoginMutation } from "../../../../services/auth/authApiSlice";
import AuthInput from "../AuthInput";
import AuthButton from "../AuthButton";
import RegisterButton from "../RegisterButton";
import AuthErrorMessage from "../AuthErrorMessage";

export default function FormLogin() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const navigate = useNavigate();
    const state = useLocation();

    const [login, { isLoading }] = useLoginMutation();

    const onSubmit = async (data) => {
        const request = {
            email: data.email,
            password: data.password,
        };
        await login(request)
            .unwrap()
            .then((response) => {
                setAuthToken(response.data.token);
                navigate("dashboard", { replace: true });
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
                message: "Failed to login, please try again",
            });
            return;
        }

        const apiError = error.data;
        if (apiError.status === 403) {
            setError("root.login", {
                type: "manual",
                message: "Your account has been deactivated",
            });
        } else if (apiError.status === 404) {
            setError("root.login", {
                type: "manual",
                message: "Incorrect email or password",
            });
        } else {
            setError("root.login", {
                type: "manual",
                message: "Something went wrong, please try again",
            });
        }
    };

    const [showPassword, setShowPassword] = useState(false);

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
                        <AuthButton text={"Login"} />
                    </form>
                    <RegisterButton text={"Register"} />
                    <AuthErrorMessage message={errors.root?.login?.message} />
                    <AuthErrorMessage
                        message={errors.root?.mutationError?.message}
                    />
                </div>
            )}
        </div>
    );
}
