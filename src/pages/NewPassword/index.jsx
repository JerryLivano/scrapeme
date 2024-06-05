import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonLogin from "../../components/elements/Button/ButtonLogin";
import { Button, InputGroup, Label } from "../../components";
import { useResetPassMutation } from "../../services/authApiSlice";
import Spinner from "../../components/elements/Spinner/Spinner";

function latency(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

const NewPassword = () => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);
    const [resetPassword, { isLoading }] = useResetPassMutation();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const email = searchParams.get("email");
    const otp = searchParams.get("tkn");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onTouched",
    });

    const onSubmit = async (data) => {
        try {
            if (data.newPassword !== data.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
          
            setButtonDisabled(true);
            
            await resetPassword(data)
            .unwrap()
            .then(async () => {
                // Do success path logic here.
                setButtonDisabled(true);
                await latency(1000);
                setShowNotification(true);
                reset();
                setButtonDisabled(false);
            })
            .catch(async () => {
                // Do error handling here.
                setButtonDisabled(true);
                await latency(1000);
                setShowErrorNotification(true);
                reset();
                setButtonDisabled(false);
            })
        } catch (error) {
            alert(error.message);
        }
    };

    const handleBackToLogin = () => {
        navigate("/"); // arahkan ke halaman login
    };

    const handleBackToForgotPassword = () => {
        navigate("/forgot-password")
    }

    return (
        <>
        {isLoading && <Spinner />}
        {!isLoading && (
            <>
            {showNotification && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-md text-center" style={{ width: '345px' }}>
                    <p className="text-lg font-semibold">Password has been<br />updated</p>

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
                    <p className="text-lg font-semibold">Something wen't wrong.<br /></p>

                        <button
                            onClick={handleBackToForgotPassword}
                            className="mt-8 px-5 py-2 bg-[#ec5858] text-white rounded-md text-sm w-full"
                        >
                            Back to Forgot Password
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
                <div className='text-center'>
                    <p className='text-sm text-gray-500'>*New password must be different from the previous password</p>
                </div>


                <input type="hidden" {...register("otp")} value={otp ?? ""} name="otp" id="otp"></input>
                <input type="hidden" {...register("email")} value={email ?? ""} name="email" id="email"></input>

                <div>
                    <Label
                        htmlFor='newPassword'
                        name='New Password'
                        mandatory={true}
                    />
                    <div className='relative w-full mt-2'>
                        <InputGroup
                            type='password'
                            id='newPassword'
                            name='newPassword'
                            placeholder='New Password'
                            errors={errors}
                            register={register}
                            required
                        />
                    </div>
                </div>

                <div>
                    <Label
                        htmlFor='confirmPassword'
                        name='Confirm Password'
                        mandatory={true}
                    />
                    <div className='relative w-full mt-2'>
                        <InputGroup
                            type='password'
                            id='confirmPassword'
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            errors={errors}
                            register={register}
                            required
                        />
                    </div>
                </div>

                <div>
                    <ButtonLogin text={"Reset Password"} type={"submit"}/>
                </div>
            </form>
            </>
        )}   
        </>
    );
};

export default NewPassword;
