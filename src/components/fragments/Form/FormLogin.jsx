import { useForm } from "react-hook-form";
import { Button, Label } from "../../elements";
import { Link, useNavigate } from "react-router-dom";
import InputGroup from "../InputGroup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthService } from "../../../services/AutServices"

const FormLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // const navigate = useNavigate();
    const onSubmit = (data) => {
        try {
            console.log(data);
            localStorage.setItem("data", JSON.stringify(data));

            navigate("/dashboard");
            reset();
        } catch (error) {
            {
                error.message;
            }
        }
    };
    //#endregion


    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const navigate= useNavigate();

    const onSubmit = async (data) => {
        //e.preventDefault();
        const email = data.email;
        const password = data.password;
        const userdata = {email, password}
        const response = await AuthService.login(userdata);
        console.log(response?.data);
        
        if(response?.data?.data){
            AuthService.setToken(response?.data?.data)
            const role = AuthService.getUserRole()
            console.log(role);
            navigate("/dashboard")
        }
        else{
            toast.error(" Invalid username or password"
                
            );
            reset();
            navigate("/login")
        }
    }

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
                        <Label
                            htmlFor='password'
                            name='Password'
                            mandatory={true}
                        />
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
                            required
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
                    <ToastContainer className="border border-red-500 place-content-center text-red-500" />
                </div>
            </form>
        </>
    );
};

export default FormLogin;
