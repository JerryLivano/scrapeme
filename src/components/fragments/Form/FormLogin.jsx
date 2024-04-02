import { useForm } from "react-hook-form";
import { Button, Label } from "../../elements";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import InputPassword from "../../elements/Input/InputPassword";
import InputGroup from "../InputGroup";

const FormLogin = () => {
    //#region Ari test
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        try {
            localStorage.setItem("email", data.email);
            localStorage.setItem("password", data.password);
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
                            placeholder='Email'
                            errors={false}
                            register={register}
                            required='required'
                        />
                    </div>
                    {errors.email && (
                        <p className='text-sm text-[#E02222]'>
                            {errors.email.message}
                        </p>
                    )}
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
                            errors={false}
                            register={register}
                            required='required'
                        />
                    </div>
                    {errors.password && (
                        <p className='text-sm text-[#E02222]'>
                            {errors.password.message}
                        </p>
                    )}
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
