import { useForm } from "react-hook-form";
import { Button, Label } from "../../elements";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
//import InputPassword from "../../elements/Input/InputPassword";
import InputGroup from "../InputGroup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthService } from "../../../services/AutServices"

const FormLogin = () => {
    //#region Ari test
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // const navigate = useNavigate();

    // const onSubmit = (data) => {
    //     localStorage.setItem("email", data.email);
    //     localStorage.setItem("password", data.password);
    //     navigate("/dashboard");
    //     reset();
    // };    
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
                        <input
                            id="email"
                            name="email"
                            type='email'
                            autoComplete='email'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 ring-1'
                            {...register("email", {
                                required: "Email required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                        "Invalid email format. ex: frato@ms.mii.co.id",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className='text-sm text-[#E02222]'>
                                {errors.email.message}
                            </p>
                        )}
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
                            <Link
                                to={"/forgot-password"}
                                className='font-bold text-blue-600'
                            >
                                forgot password?
                            </Link>
                        </div>
                    </div>

                    <div className='relative w-full mt-2'>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete='current-password'
                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                            focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 ring-1`}
                            {...register("password", {
                                required: "Password required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password minimum 8 characters. Please try again.",
                                },
                            })}
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute flex items-center inset-y-1 right-2 top-1'
                        >
                            {showPassword ? (
                                <EyeSlashIcon className='items-center w-5 h-5 text-gray-400' />
                            ) : (
                                <EyeIcon className='items-center w-5 h-5 text-gray-400' />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className='text-sm text-[#E02222]'>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* <InputGroup
                    type='text'
                    id='fullname'
                    name='fullname'
                    placeholder='Fullname'
                    errors={true}
                    register={register}
                />

                <InputGroup
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Password'
                    errors={true}
                    register={register}
                /> */}

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
