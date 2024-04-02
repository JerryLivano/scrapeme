import { useForm } from 'react-hook-form';
import Label from '../../elements/Label';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { useState } from 'react';

//#region latency waiting for transfer data to server and get email feedback from server--manual delay for test

function latency(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

//#endregion

const FormForgotPassword = () => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    //#region react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onTouched',
    });
    //#endregion
    //#region latency alert
    const onSubmit = async (data) => {
        try {
            console.log(data);
            setButtonDisabled(true);
            await latency(3000);
            alert('Please check your email for the next steps');
            reset();
            setButtonDisabled(false);
        } catch (error) {
            alert(error.message);
        }
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
                <div>
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
                    <button
                        type="submit"
                        onClick={() => handleSubmit(onSubmit)}
                        className="flex justify-center w-full h-full rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-[#5c6ac4]"
                        disabled={buttonDisabled}
                    >
                        Submit
                    </button>
                </div>
            </form>
            <p className="mt-6 text-sm text-center text-gray-500 float-end">
                <Link
                    to={'/login'}
                    className="font-bold leading-6 text-indigo-600 hover:text-indigo-500 flex gap-x-2 items-center"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    Login
                </Link>
            </p>
        </>
    );
};

export default FormForgotPassword;
