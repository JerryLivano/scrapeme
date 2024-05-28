import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import Toast from "../../components/elements/NotificationProvider/Index";
import { setAuthToken } from "../../utils/authUtilities";
import ButtonLogin from "../../components/elements/Button/ButtonLogin";
import Spinner from "../../components/elements/Spinner/Spinner";
import { InputGroup, Label } from "../../components";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const [toastType, setToastType] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const onSubmit = async (data) => {
        const userData = { email: data.email, password: data.password };
        try {
            const payload = await login(userData).unwrap();
            if (payload.data && payload.data.token) {
                setAuthToken(payload.data.token);
                dispatch(setCredentials({ token: payload.data.token }));
                navigate("/home", { replace: true });
            } else {
                setToastType("connection-error");
            }
        } catch (error) {
            if (userData.email.endsWith("mii.co.id")) {
                setToastType("error-email");
            } else {
                setToastType("error");
            }
        }
    };

    return (
        <>
            {isLoading && <Spinner />}
            {!isLoading && (
                <>
                    <Toast toastType={toastType} setTypeToast={setToastType} />
                    <form
                        className='space-y-6'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className='flex flex-col'>
                            <Label htmlFor='email' name='Email address' />
                            <div>
                                <InputGroup
                                    id='email'
                                    type='email'
                                    name='email'
                                    placeholder='Email address'
                                    errors={errors}
                                    required
                                    register={register}
                                />
                            </div>
                        </div>

                        <div>
                            <div className='flex items-center justify-between'>
                                <Label htmlFor='password' name='Password' />
                                <div className='text-sm'>
                                    <a
                                        href='/password/forgot'
                                        className='font-semibold text-indigo-600 hover:text-indigo-500'
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div className='relative w-full mt-2'>
                                <InputGroup
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder='Password'
                                    errors={errors}
                                    required
                                    register={register}
                                />
                            </div>
                        </div>

                        <div>
                            <ButtonLogin text={"Login"} type={"submit"} />
                        </div>
                    </form>
                </>
            )}
        </>
    );
};

export default Login;
