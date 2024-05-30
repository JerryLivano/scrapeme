import { Button, InputGroup } from "../../../components";
import { useForm } from "react-hook-form";
import DropdownInput from "../../../components/elements/Input/DropdownInput";
import {
    useGetRoleByIdQuery,
    useGetRoleQuery,
} from "../../../services/roleApi.Slice";
import { useGetApplicationQuery } from "../../../services/applicationApiSlice";
import { useEffect, useState } from "react";
import InputCheckboxGroup from "../../../components/elements/Input/InputCheckboxGroup";
import uuid from "react-uuid";
import {
    useGetUserQuery,
    useRegisterMutation,
} from "../../../services/userApiSlice";
import SingleLineInput from "../../../components/elements/Input/SIngleLineInput";
import Spinner from "../../../components/elements/Spinner/Spinner";
import TemporaryAddUserTable from "./TemporaryAddUserTable";
import { useGetCvMeEmployeeMutation } from "../../../services/employeeAPiSlice";
import SingleLineValueInput from "../../../components/elements/Input/SingleLineValueInput";
import { useNavigate } from "react-router-dom";
import ButtonOutline from "../../../components/elements/Button/ButtonOutline";
import ModalConfirmAddData from "../../../components/elements/Confirmation/ModalConfirmAddData";
import { toastError } from "../../../components/elements/Alert/Toast";
import ButtonSave from "../../../components/elements/Button/ButtonSave";

export default function FormAddUser() {
    let content;
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [addedUser, setAddedUser] = useState([]);
    const [selectedRoleId, setSelectedRoleId] = useState("");
    const [selectedApps, setSelectedApps] = useState([]);
    const [showAddTemp, setShowAddTemp] = useState(false);
    const [showAddAllUser, setShowAddAllUser] = useState(false);
    const [alertColor, setAlertColor] = useState(false);
    const [emailNotFound, setEmailNotFound] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
        reset,
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            id: "",
            email: "",
            firstName: "",
            lastName: "",
            nik: "",
            roleId: "",
            roleName: "",
            authorizedApplications: [],
        },
        mode: "onChange",
    });

    const { handleSubmit: handleSubmitOpenModal } = useForm({});

    const { handleSubmit: handleSubmitOpenModalAllUser } = useForm({});

    const {
        register: registerAllUser,
        handleSubmit: handleSubmitAllUser,
        reset: resetAllUser,
        formState: { errors: allUserErrors },
    } = useForm({});

    const {
        data: roles,
        isLoading: roleIsLoading,
        isSuccess: roleIsSuccess,
        isFetching: roleIsFetching,
    } = useGetRoleQuery();

    const {
        data: apps,
        isLoading: appIsLoading,
        isSuccess: appIsSuccess,
        isFetching: appIsFetching,
    } = useGetApplicationQuery({ page: page, limit: pageSize });

    const {
        data: users,
        isLoading: usersIsLoading,
        isSuccess: usersIsSuccess,
        isFetching: usersIsFetching,
    } = useGetUserQuery({ page: page, limit: pageSize, search: "", role: "" });

    const [addUser, { isLoading: registerLoading }] = useRegisterMutation();

    const [getCVMeUser, { isLoading: getCVMeEmployeeLoading }] =
        useGetCvMeEmployeeMutation();

    const onSearchCVMeUser = async (email) => {
        try {
            const request = { email };
            const response = await getCVMeUser(request).unwrap();
            if (response.data && response.code === 200) {
                setValue("firstName", response.data.firstName);
                setValue("lastName", response.data.lastName);
                setValue("nik", response.data.nik);
            }
        } catch (err) {
            setValue("firstName", "");
            setValue("lastName", "");
            setValue("nik", "");
        }
    };

    const { data: singleRole } = useGetRoleByIdQuery(watch("roleId"), {
        skip: !watch("roleId"),
    });

    if (roleIsLoading || roleIsFetching || appIsLoading || appIsFetching)
        content = <Spinner />;

    const toggleSelect = (app) => {
        if (selectedApps.find((selectedApp) => selectedApp.id === app.id)) {
            setSelectedApps(
                selectedApps.filter((selectedApp) => selectedApp.id !== app.id)
            );
        } else {
            setSelectedApps([...selectedApps, app]);
        }
    };

    const deleteAddedUser = (id) => {
        setAddedUser((prev) => prev.filter((user) => user.id !== id));
    };

    const onSubmitAddedUser = (data) => {
        if (data.email === "" || data.firstName === "") {
            setEmailNotFound(true);
            setShowAddTemp(false);
            return;
        }

        if (selectedApps.length == 0) {
            setAlertColor(true);
            setShowAddTemp(false);
            return;
        }

        if (
            addedUser.some((user) => user.email === data.email) ||
            users.data.some((user) => user.email === data.email)
        ) {
            toastError({ message: "User already added." });
            setShowAddTemp(false);
            return;
        }

        const id = uuid();

        data.authorizedApplications = selectedApps;
        data.roleName = singleRole?.data.roleName ?? "";
        setAddedUser((prev) => [...prev, { ...data, id }]);
        reset({
            email: "",
            firstName: "",
            lastName: "",
            nik: "",
            roleId: selectedRoleId,
            roleName: "",
            authorizedApplications: [],
        });
        setAlertColor(false);
        setEmailNotFound(false);
        setSelectedApps([]);
        setShowAddTemp(false);
    };

    const onSubmitAllUser = async () => {
        if (addedUser.length === 0) {
            return;
        }
        const request = addedUser.map((x) => ({
            email: x.email,
            roleId: x.roleId,
            authorizedApplications: x.authorizedApplications,
        }));
        try {
            setShowAddAllUser(false);
            for (const user of request) {
                await addUser(user).unwrap();
            }
            setAddedUser([]);
            resetAllUser();
            navigate(-1);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        onSearchCVMeUser(watch("email"));
    }, [watch("email")]);

    if (appIsSuccess && roleIsSuccess) {
        content = (
            <>
                <div className='w-full px-8 mb-8'>
                    <div className='text-xl mb-2 font-semibold'>
                        Fill in User Data
                    </div>
                    <div className='border border-gray-300 rounded-md px-8 py-6'>
                        <form
                            className='flex grow basis-2/3 flex-col gap-4'
                            onSubmit={handleSubmitOpenModal(() =>
                                setShowAddTemp(true)
                            )}
                        >
                            <table className='w-full'>
                                <tr className='border-b-2'>
                                    <td className='font-semibold text-lg px-8'>
                                        <label htmlFor='email'>Email</label>
                                    </td>
                                    <td className={"w-100 flex py-4"}>
                                        <div className='flex'>
                                            <SingleLineInput
                                                {...register("email")}
                                                notFound={emailNotFound}
                                                error={
                                                    formErrors.email?.message
                                                }
                                                placeholder='Input Email Here...'
                                                label='Email'
                                                className='w-full'
                                                errorMessage={
                                                    "Please enter user email"
                                                }
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr className='border-b-2'>
                                    <td className='font-semibold text-lg px-8'>
                                        <label htmlFor='first-name'>
                                            First Name
                                        </label>
                                    </td>
                                    <td className='w-100 flex py-4'>
                                        <SingleLineValueInput
                                            {...register("firstName")}
                                            error={
                                                formErrors.firstName?.message
                                            }
                                            value={watch("firstName")}
                                            disabled
                                            label='First Name'
                                            className='w-full'
                                        />
                                    </td>
                                </tr>
                                <tr className='border-b-2'>
                                    <td className='font-semibold text-lg px-8'>
                                        <label htmlFor='last-name'>
                                            Last Name
                                        </label>
                                    </td>
                                    <td className='w-100 flex py-4'>
                                        <SingleLineValueInput
                                            {...register("lastName")}
                                            error={formErrors.lastName?.message}
                                            value={watch("lastName")}
                                            disabled
                                            label='Last Name'
                                            className='w-full'
                                        />
                                    </td>
                                </tr>
                                <tr className='border-b-2'>
                                    <td className='font-semibold text-lg px-8'>
                                        <label htmlFor='nik'>NIK</label>
                                    </td>
                                    <td className='w-100 flex py-4'>
                                        <SingleLineValueInput
                                            {...register("nik")}
                                            error={formErrors.nik?.message}
                                            value={watch("nik")}
                                            disabled
                                            label='NIK'
                                            className='w-full'
                                        />
                                    </td>
                                </tr>
                                <tr className='border-b-2'>
                                    <td className='font-semibold text-lg px-8'>
                                        <label htmlFor='role'>Role</label>
                                    </td>
                                    <td className='w-100 flex py-4'>
                                        <DropdownInput
                                            required
                                            className='w-1/3'
                                            value={selectedRoleId}
                                            onChange={(e) => {
                                                setSelectedRoleId(
                                                    e.target.value
                                                );
                                                setValue(
                                                    "roleId",
                                                    e.target.value
                                                );
                                            }}
                                            disabled={
                                                !roleIsSuccess ||
                                                roles.length === 0
                                            }
                                            error={
                                                !roleIsSuccess ||
                                                roles.length === 0
                                                    ? "No role available"
                                                    : ""
                                            }
                                        >
                                            {roleIsSuccess &&
                                                roles.data.map((role) => (
                                                    <option
                                                        key={role.id}
                                                        value={role.id}
                                                    >
                                                        {role.roleName
                                                            .charAt(5)
                                                            .toUpperCase() +
                                                            role.roleName
                                                                .slice(6)
                                                                .toLowerCase()}
                                                    </option>
                                                ))}
                                        </DropdownInput>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='font-semibold text-lg px-8'>
                                        Application Access
                                    </td>
                                    <td className='w-100 flex flex-col items-start py-4 font-light'>
                                        <div
                                            className={`text-md ${
                                                alertColor ? "text-red-600" : ""
                                            }`}
                                        >
                                            Select At least one to activate the
                                            user
                                        </div>
                                        <InputCheckboxGroup
                                            data={appIsSuccess ? apps.data : []}
                                            toggleSelect={toggleSelect}
                                            selectedApps={selectedApps}
                                            error={
                                                !appIsSuccess ||
                                                apps.data.length === 0
                                                    ? "No Applications found"
                                                    : ""
                                            }
                                        />
                                    </td>
                                </tr>
                            </table>
                            <div className='grow basis-1/3 flex justify-end py-4'>
                                <Button text={"Add"} type={"submit"} />
                            </div>
                        </form>
                        <ModalConfirmAddData
                            title={"Confirm Add Temporary User"}
                            message={"Are you sure want to add user?"}
                            onConfirmHandler={handleSubmit(onSubmitAddedUser)}
                            openModal={showAddTemp}
                            setOpenModal={setShowAddTemp}
                            typeButton={"submit"}
                        />
                    </div>
                </div>
                <hr />
                <div className='mt-6'>
                    <TemporaryAddUserTable
                        userData={addedUser}
                        onDelete={deleteAddedUser}
                    />

                    <form
                        className='flex grow basis-2/3 flex-col gap-4'
                        onSubmit={handleSubmitOpenModalAllUser(() =>
                            setShowAddAllUser(true)
                        )}
                    >
                        <div className='flex justify-end mt-6'>
                            <span>
                                <ButtonOutline
                                    text={"Cancel"}
                                    type={"button"}
                                    onClick={() => navigate(-1)}
                                    borderColor={"#64748B"}
                                    secColor={"gray-400"}
                                />
                            </span>
                            <span className='ml-3'>
                                <ButtonSave text={"Save"} type={"submit"} />
                            </span>
                        </div>
                    </form>
                    <ModalConfirmAddData
                        title={"Confirm Add All Users"}
                        message={"Are you sure want to save the changes?"}
                        onConfirmHandler={handleSubmitAllUser(onSubmitAllUser)}
                        openModal={showAddAllUser}
                        setOpenModal={setShowAddAllUser}
                        typeButton={"submit"}
                    />
                </div>
            </>
        );
    }

    return content;
}
