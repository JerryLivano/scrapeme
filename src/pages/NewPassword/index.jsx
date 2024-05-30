import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputGroup, Label } from "../../components";

function latency(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

const NewPassword = () => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();

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
            console.log(data);
            setButtonDisabled(true);
            await latency(1000);
            setShowNotification(true);
            reset();
            setButtonDisabled(false);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleBackToLogin = () => {
        navigate("/login"); // arahkan ke halaman login
    };

    return (
        <>
            {showNotification && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md text-center">
                        <p>Password has been updated</p>
                        <button
                            onClick={handleBackToLogin}
                            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md"
                        >
                            Back to Log In
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
                    <Button
                        text={"Reset Password"}
                        type='submit'
                        onClick={handleSubmit(onSubmit)}
                        disabled={buttonDisabled}
                    >
                        Reset Password
                    </Button>
                </div>
            </form>
        </>
    );
};

export default NewPassword;
