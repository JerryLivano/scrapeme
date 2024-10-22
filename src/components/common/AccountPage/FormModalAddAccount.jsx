import { useForm } from "react-hook-form";
import { useAddAccountMutation } from "../../../services/account/accountApiSlice";
import { useGetRolesQuery } from "../../../services/role/roleApiSlice";
import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../Public/Toast";
import Spinner from "../Public/Spinner";
import ButtonSubmitModal from "../Public/Button/ButtonSubmitModal";
import SingleLineInput from "../Public/Form/SingleLineInput";
import SingleLinePasswordInput from "../Public/Form/SingleLinePasswordInput";
import ButtonShowPassword from "../Public/Button/ButtonShowPassword";
import ModalActionForm from "../Public/Form/ModalActionForm";
import DropdownInput from "../Public/Form/DropdownInput";

export default function FormModalAddAccount({ open, setOpen }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [addAccount, { isLoading: addAccountLoading }] =
        useAddAccountMutation();
    const {
        data: roles,
        isLoading: roleLoading,
        isError: roleError,
        isSuccess: roleSuccess,
    } = useGetRolesQuery();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            roleGuid: roleSuccess ? roles.data[1].guid : "",
            createdBy: "admin",
        },
        mode: "onSubmit",
    });

    useEffect(() => {
        if (roles && roleSuccess) {
            setValue("roleGuid", roles.data[1].guid);
        }
    }, [roles]);

    const onSubmit = async (data) => {
        const request = {
            first_name: data.firstName,
            last_name: data.lastName.trim() !== "" ? data.lastName : null,
            email: data.email,
            password: data.password,
            confirm_password: data.confirmPassword,
            role_guid: data.roleGuid,
            created_by: data.createdBy,
        };
        await addAccount(request)
            .unwrap()
            .then(() => {
                toastSuccess({ message: `Successfully added account` });
            })
            .catch(() => {
                toastError({ message: "Failed to add account" });
            });
        setOpen(false);
        reset({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            roleGuid: roles.data[1].guid,
            createdBy: "admin",
        });
    };

    return (
        <>
            <ModalActionForm
                open={open}
                setOpen={setOpen}
                titleForm={"Add User Account"}
            >
                {roleLoading && <Spinner />}
                {roleError && (
                    <div className='py-5 text-center text-xl font-semibold text-gray-700'>
                        Role not found
                    </div>
                )}
                {roleSuccess && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <SingleLineInput
                            label={"First Name"}
                            required
                            placeholder={"Enter first name"}
                            className={"mt-4"}
                            {...register("firstName", {
                                required: "First name is required",
                            })}
                            error={formErrors.firstName?.message}
                        />

                        <SingleLineInput
                            label={"Last Name (Optional)"}
                            placeholder={"Enter last name"}
                            className={"mt-4"}
                            {...register("lastName")}
                            error={formErrors.lastName?.message}
                        />

                        <SingleLineInput
                            label={"Email"}
                            required
                            type={"email"}
                            placeholder={"Enter email"}
                            className={"mt-4"}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email is not valid",
                                },
                            })}
                            error={formErrors.email?.message}
                        />

                        <SingleLinePasswordInput
                            label={"Password"}
                            required
                            placeholder={"Enter password"}
                            className={"mt-4"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters long",
                                },
                            })}
                            type={showPassword ? "text" : "password"}
                            error={formErrors.password?.message}
                            endAdornment={
                                <ButtonShowPassword
                                    active={showPassword}
                                    setActive={() =>
                                        setShowPassword(!showPassword)
                                    }
                                />
                            }
                        />

                        <SingleLinePasswordInput
                            label={"Confirm Password"}
                            required
                            placeholder={"Enter confirm password"}
                            className={"mt-4"}
                            {...register("confirmPassword", {
                                required: "Confirm password is required",
                                validate: (value) =>
                                    value === watch("password") ||
                                    "Password not match",
                            })}
                            type={showConfirmPassword ? "text" : "password"}
                            error={formErrors.confirmPassword?.message}
                            endAdornment={
                                <ButtonShowPassword
                                    active={showConfirmPassword}
                                    setActive={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                />
                            }
                        />

                        <DropdownInput
                            required
                            className={"mt-4"}
                            label={"Role"}
                            value={watch("roleGuid")}
                            {...register("roleGuid")}
                            onChange={(e) =>
                                setValue("roleGuid", e.target.value)
                            }
                            disabled={roleError || roles.data.length === 0}
                            error={formErrors.roleGuid?.message}
                        >
                            {roleSuccess &&
                                roles.data.map((role) => (
                                    <option
                                        key={role.guid}
                                        value={role.guid}
                                        selected={
                                            role.guid === watch("roleGuid")
                                        }
                                    >
                                        {role.role_name
                                            .charAt(5)
                                            .toUpperCase() +
                                            role.role_name
                                                .slice(6)
                                                .toLowerCase()}
                                    </option>
                                ))}
                        </DropdownInput>

                        <div className='mt-4 flex items-center justify-end'>
                            <ButtonSubmitModal text='Add Data' />
                        </div>
                    </form>
                )}
            </ModalActionForm>
            {addAccountLoading && (
                <div className='relative'>
                    <div className='fixed inset-0 z-[70] bg-gray-300 opacity-75 transition-opacity'>
                        <Spinner />
                    </div>
                </div>
            )}
        </>
    );
}
