import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, InputGroup, Label } from "../../components";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import Toast from "../../components/elements/NotificationProvider/Notification";
import { setAuthToken } from "../../utils/authUtilities";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [toastType, setToastType] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login] = useLoginMutation();

    const onSubmit = async (data) => {
        const userData = { email: data.email, password: data.password };

        try {
            const payload = await login(userData).unwrap();
            if (payload.data && payload.data.token) {
                setAuthToken(payload.data.token);
                dispatch(setCredentials({ token: payload.data.token }));
                navigate("/homepage", { replace: true });
            } else {
                throw new Error("Invalid response");
            }
        } catch (error) {
            console.error("Login error: ", error);
            toast.error("Invalid username or password");
            reset();
        }
    };

    return (
        <>
            <Toast toastType={toastType} setTypeToast={setToastType} />
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col'>
                    <Label htmlFor='email' name='Email address' />
                    <div>
                        <InputGroup
                            type='email'
                            id='email'
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
                    <Button type='submit' size='size-96'>
                        Login
                    </Button>
                </div>
            </form>
        </>
    );
};

export default Login;
