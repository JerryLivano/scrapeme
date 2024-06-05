import { useForm } from "react-hook-form";
import { Button, Label } from "../../elements/index";
import { useNavigate } from "react-router-dom";
import InputGroup from "../InputGroup";
import { ToastContainer, toast } from "react-toastify";
import { AuthService } from "../../../services/authService";
import { setAuthToken } from "../../../utils/authUtilities";

const FormLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        const userData = { email, password };

        try {
            const payload = await AuthService.login(userData).unwrap();
            setAuthToken(payload.data.token);
            localStorage.setItem("PortalToken", payload.data.token);
            navigate("home", { replace: true });
        } catch (error) {
            toast.error("Invalid username or password");
            reset();
        }
    };

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
                            placeholder='Email address'
                            errors={errors}
                            register={register}
                            required
                        />
                    </div>
                </div>

                <div>
                    <div className='flex items-center justify-between'>
                        <Label htmlFor='password' name='Password' />
                        <div className='text-sm'>
                            <a
                                href='/forgot-password'
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
                    <ToastContainer className='text-red-500 border border-red-500 place-content-center' />
                </div>
            </form>
        </>
    );
};

export default FormLogin;
