import { useForm } from 'react-hook-form';
import Button from '../../elements/Button/Button';
import Label from '../../elements/Label';

import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
const FormForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    //#region test only
    const onSubmit = (event) => {
        event.preventDefault;
        console.log(event.mail);
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
                                required:
                                    'Invalid email format. Please enter valid email address',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                        'Invalid email format. Please enter valid email address',
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
                    <Button type="submit" onClick={handleSubmit(onSubmit)}>
                        Submit
                    </Button>
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
