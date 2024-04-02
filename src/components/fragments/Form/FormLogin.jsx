import { useForm } from 'react-hook-form';
import { Button, Label } from '../../elements';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from 'react-router-dom';

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
        localStorage.setItem('email', data.mail);
        localStorage.setItem('password', data.password);
        navigate('/dashboard');
        reset();
    };
    //#endregion
    return (
        <>
            <form
                className="space-y-6"
                action="#"
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col">
                    <Label
                        htmlFor="email"
                        validation={
                            errors.mail ? 'text-red-500' : 'text-gray-900'
                        }
                    >
                        Email <span className="text-[#E02222]">*</span>
                    </Label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 ring-1"
                            {...register('mail', {
                                required: 'Email required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                        'Invalid email format. ex: frato@ms.mii.co.id',
                                },
                            })}
                        />
                        {errors.mail && (
                            <p className="text-sm text-[#E02222]">
                                {errors.mail.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <Label
                            htmlFor="password"
                            validation={
                                errors.password
                                    ? 'text-red-500'
                                    : 'text-gray-900'
                            }
                        >
                            Password <span className="text-[#E02222]">*</span>
                        </Label>
                        <div className="text-sm">
                            <Link
                                to={'/forgot-password'}
                                className="font-bold text-blue-600"
                            >
                                forgot password?
                            </Link>
                        </div>
                    </div>
                    <div className="mt-2 relative w-full">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                            focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 ring-1`}
                            {...register('password', {
                                required: 'Password required',
                                minLength: {
                                    value: 8,
                                    message:
                                        'Password minimum 8 characters. Please try again.',
                                },
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-1 right-2 top-1 flex items-center"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5 text-gray-700 items-center" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-gray-700 items-center" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-sm text-[#E02222]">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div>
                    <Button
                        type="submit"
                        size="size-96"
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
