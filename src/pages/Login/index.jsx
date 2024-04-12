import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button, InputGroup, Label} from "../../components";
import { AuthService } from "../../services/authService";
import Toast from "../../components/elements/NotificationProvider/Notification";
import { useState } from "react";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const navigate = useNavigate();

    const [toast, setTypeToast] = useState('');

    const onSubmit = async (data) => {
        //e.preventDefault();
        const email = data.email;
        const password = data.password;
        const userdata = { email, password };
        const response = await AuthService.login(userdata);

        if (response?.data) {    
           
             setTypeToast("success");
            navigate("/dashboard");            

        } else {
            setTypeToast("error");
            reset();
        }
    };

    return (
        <>
            <Toast toastType={toast}  setTypeToast={setTypeToast} />
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
                    />
                    <div className='mt-2'>
                        <InputGroup
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Email address'
                            errors={errors}
                            register={register}
                        />
                    </div>
                </div>

                <div>
                    <div className='flex items-center justify-between'>
                        <Label
                            htmlFor='password'
                            name='Password'
                        />
                        <div className='text-sm'>
                            <a
                                href='/password/forgot'
                                className='font-semibold text-indigo-600 hover:text-indigo-500'
                            >
                                Forgot password?
                            </a>
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

export default Login