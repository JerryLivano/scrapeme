import React, { useState } from "react";
import { extractId, getAuthToken } from "../../utils/authUtilities";
import {
    useChangePasswordMutation,
    useGetPermissionBasedUserQuery,
} from "../../services/userApiSlice";
import Spinner from "../../components/elements/Spinner/Spinner";
import ButtonText from "../../components/elements/Button/ButtonText";
import SingleLineInput from "../../components/elements/Input/SingleLineInput";
import { useForm } from "react-hook-form";
import {
    toastError,
    toastSuccess,
} from "../../components/elements/Alert/Toast";

const ProfileData = () => {
    const token = getAuthToken();
    const userId = extractId(token);

    const [passwordError, setPasswordError] = useState(false);
    const [errorLabel, setErrorLabel] = useState("");

    const {
        data: userData,
        isSuccess: userSuccess,
        isLoading: userLoading,
        isError: userError,
    } = useGetPermissionBasedUserQuery(userId);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const [changePassword, { isLoading: changePasswordLoading }] =
        useChangePasswordMutation();

    const onChangePassword = async (data) => {
        const request = {
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
        };
        try {
            await changePassword(request).unwrap();
            toastSuccess({ message: "Password has been updated" });
            setPasswordError(false);
            reset();
        } catch (e) {
            setPasswordError(true);
            if (e.status === 400) {
                setErrorLabel(e.data.message);
            } else {
                setErrorLabel("Internal server error");
            }
        }
    };

    return (
        <>
            {userLoading && <Spinner />}
            {userError && (
                <div className='justify-center text-xl font-semibold'>
                    Error Fetching User Data
                </div>
            )}
            {userSuccess && (
                <div className='mt-16 w-full'>
                    {/* Name */}
                    <div className='w-full py-4 px-2 border-t-2 border-gray-200'>
                        <div className='flex h-full w-full items-center justify-between'>
                            <div className='w-[260px] font-semibold'>
                                <label htmlFor='name'>Full Name</label>
                            </div>
                            <div className='w-full' id='name'>
                                {userData.data.name}
                            </div>
                        </div>
                    </div>

                    {/* NIK */}
                    <div className='w-full py-4 px-2 border-t-2 border-gray-200'>
                        <div className='flex h-full w-full items-center justify-between'>
                            <div className='w-[260px] font-semibold'>
                                <label htmlFor='nik'>NIK</label>
                            </div>
                            <div className='w-full' id='nik'>
                                {userData.data.nik}
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className='w-full py-4 px-2 border-t-2 border-gray-200'>
                        <div className='flex h-full w-full items-center justify-between'>
                            <div className='w-[260px] font-semibold'>
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div className='w-full' id='email'>
                                {userData.data.email}
                            </div>
                        </div>
                    </div>

                    {/* Password */}
                    <div className='w-full py-4 px-2 border-t-2 border-gray-200'>
                        <div className='flex h-full w-full items-center justify-between'>
                            <div className='w-[260px] font-semibold'>
                                <label htmlFor='password'>Change Password</label>
                            </div>
                            <div className='flex w-full' id='password'>
                                <form
                                    className='w-full'
                                    onSubmit={handleSubmit(onChangePassword)}
                                >
                                    <div className='flex w-full items-center justify-between'>
                                        <div className='flex w-full items-center'>
                                            <div className='flex flex-col gap-y-4 mr-4 w-4/5'>
                                                <div className='flex flex-row w-full items-center'>
                                                    <div className='w-1/4'>
                                                        New Password
                                                    </div>
                                                    <div className='w-full'>
                                                        <SingleLineInput
                                                            isPassword
                                                            inputLabel={false}
                                                            {...register(
                                                                "newPassword"
                                                            )}
                                                            error={
                                                                formErrors
                                                                    .newPassword
                                                                    ?.message
                                                            }
                                                            notFound={
                                                                passwordError
                                                            }
                                                            errorMessage={
                                                                errorLabel
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex flex-row w-full items-center'>
                                                    <div className='w-1/4'>
                                                        Confirm Password
                                                    </div>
                                                    <div className='w-full'>
                                                        <SingleLineInput
                                                            isPassword
                                                            inputLabel={false}
                                                            {...register(
                                                                "confirmPassword"
                                                            )}
                                                            error={
                                                                formErrors
                                                                    .confirmPassword
                                                                    ?.message
                                                            }
                                                            notFound={
                                                                passwordError
                                                            }
                                                            errorMessage={
                                                                errorLabel
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='pr-10'>
                                            <ButtonText
                                                text={"Save"}
                                                type={"submit"}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* History */}
                    <div className='w-full py-4 px-2 border-t-2 border-gray-200'>
                        <div className='flex h-full w-full items-start justify-between'>
                            <div className='w-[260px] font-semibold'>
                                <label htmlFor='log'>Log Activity</label>
                            </div>
                            <div className='w-full' id='email'>
                                Dummy
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileData;
