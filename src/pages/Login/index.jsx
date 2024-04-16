import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, InputGroup, Label} from "../../components";
import { AuthService } from "../../services/authService";
import Toast from "../../components/elements/NotificationProvider/Notification";
import { useEffect, useRef, useState } from "react";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";


const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    ///
    const userRef = useRef();
    const errorRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    const [login,{isLogin}] = useLoginMutation();
    const dispatch= useDispatch();


    const [toast, setTypeToast] = useState('');
    
    const onSubmit = async(e) =>{
        try{
       
            const userData = await login({email, password}).unwrap();
            console.log(userData);
            dispatch(setCredentials({...userData, email}));
            setEmail('');
            setPassword('');
            
            setTypeToast("success");
            navigate('/dashboard')

        }
        catch(error){
            setTypeToast("error");


            if(error.response?.status === 401){
                console.log('Unauthorize');
                setErrorMessage('Unauthorize')
            }
            else{
                setErrorMessage('login failed')
            }
        }
    }

    const handleUserInput = (e) => setEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value)

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
                            value={email}
                            name='email'
                            onChange ={handleUserInput} 
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
                            value={password}
                            name='password'
                            placeholder='Password'
                            onChange={handlePasswordInput}
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