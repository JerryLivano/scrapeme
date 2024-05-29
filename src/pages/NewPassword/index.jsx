import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, InputGroup, Label } from "../../components";

//#region latency waiting for transfer data to server and get email feedback from server--manual delay for test
//function latency(delay) {
    //return new Promise(function (resolve) {
        //setTimeout(resolve, delay);
    //});
//}
//#endregion

const NewPassword = () => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
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
            if (data.newPassword !== data.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            console.log(data);
            setButtonDisabled(true);
            await latency(1000);
            alert("Password has been reset successfully");
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
                className='space-y-6'
                action='#'
                method='POST'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='text-center'>
                    <img src='/path-to-your-logo.png' alt='Metrodata' className='mx-auto mb-4' />
                    <h2 className='text-2xl font-bold'>Portal-ME</h2>
                    <p className='text-sm text-gray-500'>*New password must be different from the previous password</p>
                </div>

                <div>
                    <Label
                        htmlFor='newPassword'
                        name='New Password*'
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
                        name='Confirm Password*'
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
