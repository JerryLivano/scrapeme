import { useForm } from "react-hook-form";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ButtonLogin from "../../components/elements/Button/ButtonLogin";
import { Button, InputGroup, Label } from "../../components";
import { useForgotPasswordMutation } from "../../services/authApiSlice";
import Spinner from "../../components/elements/Spinner/Spinner";

//#region latency waiting for transfer data to server and get email feedback from server--manual delay for test

function latency(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

//#endregion

const ForgotPassword = () => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const navigate = useNavigate();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const [showNotification, setShowNotification] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);

    const handleBackToLogin = () => {
        navigate("/");
    }

    const handleHideErrorNotification = () => {
        setShowErrorNotification(false);
    }

    //#region react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onTouched",
    });
    //#endregion
    //#region latency alert
    const onSubmit = async (data) => {
        try {
            await forgotPassword(data)
            .unwrap()
            .then(async (payload) => {
                setButtonDisabled(true);
                await latency(1000);
                // alert("Please check your email for the next steps");
                setShowNotification(true);
                reset();
                setButtonDisabled(false);
            })
            .catch((err) => {
                setShowErrorNotification(true);
            })

        } catch (error) {
            alert(error.message);
        }
    };
    //#endregion
    return (
        <>
        {isLoading && <Spinner />}
        {!isLoading && 
        (
            <>

            {showNotification && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-md text-center" style={{ width: '345px' }}>
                    <p className="text-lg font-semibold">A reset password email has been sent to your account.</p>
                        <button
                            onClick={handleBackToLogin}
                            className="mt-8 px-5 py-2 bg-[#5928ED] text-white rounded-md text-sm w-full"
                        >
                            Back to Log In
                        </button>
                    </div>
                </div>
            )}

            {showErrorNotification && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-md text-center" style={{ width: '345px' }}>
                    <p className="text-lg font-semibold">Account not found, make sure you've typed the correct email.</p>

                        <button
                            onClick={handleHideErrorNotification}
                            className="mt-8 px-5 py-2 bg-[#ec5858] text-white rounded-md text-sm w-full"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            )}

            <form
                className='space-y-6'
                action='#'
                method='POST'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
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
                            required
                        />
                    </div>
                </div>

                <div>
                    <ButtonLogin text={"Submit"} type={"submit"} />
                </div>
            </form>
            <p className='mt-6 text-sm text-center text-gray-500 float-end'>
                <Link
                    to={"/login"}
                    className='flex items-center font-bold leading-6 text-indigo-600 hover:text-indigo-500 gap-x-2'
                >
                    <ArrowLeftIcon className='w-5 h-5' />
                    Login
                </Link>
            </p>

            </>
        )}
    </>
    );
};

export default ForgotPassword;
