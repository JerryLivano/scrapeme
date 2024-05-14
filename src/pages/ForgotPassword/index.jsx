import { useForm } from "react-hook-form";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, InputGroup, Label } from "../../components";

//#region latency waiting for transfer data to server and get email feedback from server--manual delay for test

function latency(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

//#endregion

const ForgotPassword = () => {
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
            setButtonDisabled(true);
            await latency(1000);
            alert("Please check your email for the next steps");
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
                    <Button
                        type='submit'
                        onClick={handleSubmit(onSubmit)}
                        disabled={buttonDisabled}
                    >
                        Submit
                    </Button>
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
    );
};

export default ForgotPassword;
