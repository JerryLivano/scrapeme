import { useForm } from "react-hook-form";
import FormModal from "../../../components/fragments/Form/FormModal";
import SingleLineInput from "../../../components/elements/Input/SingleLineInput";
import ModalSingleLineInput from "../../../components/elements/Input/Modal/ModalSingleLineInput";
import { useEffect, useState } from "react";
import ModalDropdownInput from "../../../components/elements/Input/Modal/ModalDropdownInput";
import { Button } from "../../../components/index";
import ModalGroupCheckboxInput from "./ModalGroupCheckboxInput";
import { useUpdateUserMutation } from "../../../services/userApiSlice";
import {
    toastError,
    toastSuccess,
} from "../../../components/elements/Alert/Toast";

export default function FormModalEditUser({
    open,
    setOpen,
    user,
    roles,
    applications,
}) {
    const [authApp, setAuthApp] = useState([]);
    const [errorSelectApp, setErrorSelectApp] = useState(false);
    const statusOptions = ["Active", "Inactive"];

    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        setValue,
        formState: { errors: errorsForm },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            email: user.email,
            name: user.name,
            nik: user.nik,
            roleId: user.roleId,
            isActive: user.isActive,
            authApp: user.authorizedApplications,
        },
    });

    useEffect(() => {
        if (user) {
            setValue("email", user.email);
            setValue("name", user.name);
            setValue("nik", user.nik);
            setValue("roleId", user.roleId);
            setValue("authApp", user.authorizedApplications);
            setValue("isActive", user.isActive);
            setAuthApp(user.authorizedApplications);
        }
    }, [user, open, setValue]);

    const onToggleCheckbox = (dataApp) => {
        if (authApp.find((app) => app.id === dataApp.id)) {
            setAuthApp(authApp.filter((app) => app.id !== dataApp.id));
        } else {
            setAuthApp([...authApp, dataApp]);
        }
    };

    useEffect(() => {
        if (authApp.length > 0) {
            setErrorSelectApp(false);
        }
    }, [authApp]);

    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const onSubmit = async (data) => {
        if (authApp.length > 0) {
            try {
                const request = {
                    accountId: user.accountId,
                    roleId: data.roleId,
                    isActive: data.isActive,
                    authorizedApplications: authApp.map((app) => app.id),
                };
                await updateUser(request).unwrap();
                toastSuccess({ message: "Successfully updated User" });
            } catch {
                toastError({ message: "Failed to update User" });
            }
            setOpen(false);
        } else {
            setErrorSelectApp(true);
        }
    };

    return (
        <>
            <FormModal
                open={open}
                setOpen={setOpen}
                titleForm={"Edit Employee"}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='w-[28rem] flex-auto px-4'
                    noValidate
                >
                    {/* Email */}
                    <ModalSingleLineInput
                        disabled={true}
                        label={"Email"}
                        {...register("email")}
                    />

                    {/* First Name */}
                    <ModalSingleLineInput
                        disabled={true}
                        label={"Name"}
                        {...register("name")}
                    />

                    {/* NIK */}
                    <ModalSingleLineInput
                        disabled={true}
                        label={"NIK"}
                        {...register("nik")}
                    />

                    {/* Role */}
                    <ModalDropdownInput
                        required
                        label={"Role"}
                        {...register("roleId", {
                            required: "Role is required",
                        })}
                        errors={errorsForm.roleId?.message}
                    >
                        {roles.map((role) => (
                            <option
                                key={role.id}
                                value={role.id}
                                selected={role.id === watch("roleId")}
                            >
                                {role.roleName.charAt(5).toUpperCase() +
                                    role.roleName.slice(6).toLowerCase()}
                            </option>
                        ))}
                    </ModalDropdownInput>

                    {/* Status */}
                    <ModalDropdownInput
                        required
                        label={"Status"}
                        onChange={(e) => {
                            setValue("isActive", e.target.value === "Active");
                        }}
                        errors={errorsForm.isActive?.message}
                    >
                        {statusOptions.map((option) => (
                            <option
                                key={option}
                                value={option}
                                selected={
                                    watch("isActive")
                                        ? option === "Active"
                                        : option === "Inactive"
                                }
                            >
                                {option}
                            </option>
                        ))}
                    </ModalDropdownInput>

                    {/* Application */}
                    <ModalGroupCheckboxInput
                        items={applications}
                        title={"Application Access"}
                        description={"Select at least one to activate the user"}
                        valueApp={authApp}
                        isApplicationError={errorSelectApp}
                        onClick={(dataApp) => onToggleCheckbox(dataApp)}
                    />

                    <div className='w-full mt-6'>
                        <Button
                            type={"submit"}
                            text={"Save"}
                            className={"w-full"}
                            onClick={() => {}}
                        />
                    </div>
                </form>
            </FormModal>
        </>
    );
}
