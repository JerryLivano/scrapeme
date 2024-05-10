import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Alert, Button, InputGroup, Label } from "../../components";
import { AuthService } from "../../services/authService";
import Toast from "../../components/elements/NotificationProvider/Notification";
import { useEffect, useRef, useState } from "react";
import { useLoginMutation, useProfileMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const userRef = useRef();
    const errorRef = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();    
    const [login, {isLogin}] = useLoginMutation();    

    const dispatch= useDispatch();

    //set param for notification
    const [toast, setTypeToast] = useState('');    

    const onSubmit = async(e) =>{
        try{
                   
            await login({email, password})
            .unwrap()
            .then((payload) => {
                console.log(payload)
                navigate('/homepage')
            });
            // const accessToken =  userToken.access_token
            // dispatch(setCredentials({token:accessToken}));

            // const token = userToken.access_token;
            // //get user data
            // const userData = await profile(token).unwrap();

            // console.log(userData);
            // setEmail('');
            // setPassword('');            
            // navigate('/homepage')

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
    };

    const handleUserInput = (e) => setEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);

    return (
        <>
            <Toast toastType={toast} setTypeToast={setTypeToast} />

            {/* {alertVisible === true ? (
                <Alert title={errorMessage} setVisibles={alertVisible}>
                    <li>Nenek lu mantan ladies punk</li>
                </Alert>
            ) : null} */}

            <form
                className='space-y-6'
                action='#'
                method='POST'
                onSubmit={handleSubmit(onSubmit)}
            >
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

                <div>
                    <div className='flex items-center justify-between'>
                        <Label htmlFor='' name='' />
                        <div className='text-sm'>
                            <a
                                href='/password/forgot'
                                className='font-semibold text-indigo-600 hover:text-indigo-500'
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    
                    <div className='mt-2'>
                        <InputGroup
                            type='password'
                            id='password'
                            name='password'
                            placeholder='password'
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
                </div>
            </form>
        </>
    );
};

export default Login;
