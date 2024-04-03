import { useForm } from "react-hook-form";
import { Button, Label } from "../../elements";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import InputPassword from "../../elements/Input/InputPassword";
import InputGroup from "../InputGroup";

const FormLogin = () => {
    //#region Ari test
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        try {
            console.log(data);
            localStorage.setItem("data", JSON.stringify(data));
            // localStorage.setItem("password", data.password);
            navigate("/dashboard");
            reset();
        } catch (error) {
            {
                error.message;
            }
        }
    };
    //#endregion
    return (
        <>
            <form
                className='space-y-6'
                action='#'
                method='POST'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='flex flex-col'>
                    <Label
                        htmlFor='email'
                        name='Email address'
                        mandatory={true}
                    />
                    <div className='mt-2'>
                        <InputGroup
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Email address'
                            errors={errors}
                            register={register}
                            required={true}
                        />
                    </div>
                </div>

                <div>
                    <div className='flex items-center justify-between'>
                        <Label
                            htmlFor='password'
                            name='Password'
                            mandatory={true}
                        />
                        <div className='text-sm'>
                            <Link
                                to={"/forgot-password"}
                                className='font-bold text-blue-600'
                            >
                                forgot password?
                            </Link>
                        </div>
                    </div>
                    <div className='relative w-full mt-2'>
                        <InputGroup
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Password'
                            errors={errors}
                            register={register}
                            required={true}
                        />
                    </div>
                </div>

                <div>
                    <Button
                        type='submit'
                        size='size-96'
                        onClick={() => handleSubmit(onSubmit)}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </>
    );
};

export default FormLogin;
