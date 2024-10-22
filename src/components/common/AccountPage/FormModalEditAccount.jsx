import { useForm } from "react-hook-form";
import { useUpdateAccountMutation } from "../../../services/account/accountApiSlice";
import { useGetRolesQuery } from "../../../services/role/roleApiSlice";
import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../Public/Toast";
import Spinner from "../Public/Spinner";
import ButtonSubmitModal from "../Public/Button/ButtonSubmitModal";
import SingleLineInput from "../Public/Form/SingleLineInput";
import ModalActionForm from "../Public/Form/ModalActionForm";
import DropdownInput from "../Public/Form/DropdownInput";

export default function FormModalEditAccount({ open, setOpen, account }) {
    const [editAccount, { isLoading: editAccountLoading }] =
        useUpdateAccountMutation();
    const {
        data: roles,
        isLoading: roleLoading,
        isError: roleError,
        isSuccess: roleSuccess,
    } = useGetRolesQuery();

    const statusOption = [
        { label: "Active", value: true },
        { label: "Inactive", value: false },
    ];

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            roleGuid: "",
            isActive: "",
        },
        mode: "onSubmit",
    });

    useEffect(() => {
        if (account && account.user && account.role) {
            setValue("firstName", account.user.first_name);
            setValue(
                "lastName",
                account.user.last_name ? account.user.last_name : ""
            );
            setValue("email", account.user.email);
            setValue("roleGuid", account.role.guid);
            setValue("isActive", account.is_active ? "Active" : "Inactive");
        }
    }, [account]);

    const onSubmit = async (data) => {
        const request = {
            guid: account.guid,
            first_name: data.firstName,
            last_name: data.lastName.trim() !== "" ? data.lastName : null,
            email: data.email,
            role_guid: data.roleGuid,
            is_active: data.isActive === "Active",
        };
        await editAccount(request)
            .unwrap()
            .then(() => {
                toastSuccess({ message: `Successfully edited account` });
            })
            .catch(() => {
                toastError({ message: "Failed to edit account" });
            });
        setOpen(false);
        reset();
    };

    return (
        <>
            <ModalActionForm
                open={open}
                setOpen={setOpen}
                titleForm={"Edit User Account"}
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

                        <DropdownInput
                            required
                            className={"mt-4"}
                            label={"Status"}
                            value={watch("isActive")}
                            {...register("isActive")}
                            onChange={(e) =>
                                setValue("isActive", e.target.value)
                            }
                            error={formErrors.isActive?.message}
                        >
                            {statusOption.map((status) => (
                                <option
                                    key={status.label}
                                    value={status.label}
                                    selected={
                                        status.label === watch("isActive")
                                    }
                                >
                                    {status.label}
                                </option>
                            ))}
                        </DropdownInput>

                        <div className='mt-4 flex items-center justify-end'>
                            <ButtonSubmitModal text='Save' />
                        </div>
                    </form>
                )}
            </ModalActionForm>
            {editAccountLoading && (
                <div className='relative'>
                    <div className='fixed inset-0 z-[70] bg-gray-300 opacity-75 transition-opacity'>
                        <Spinner />
                    </div>
                </div>
            )}
        </>
    );
}
