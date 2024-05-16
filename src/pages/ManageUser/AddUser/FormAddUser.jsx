import { Button, InputGroup } from "../../../components";
import { useForm } from "react-hook-form";
import DropdownInput from "../../../components/elements/Input/DropdownInput";
import { useGetRoleQuery } from "../../../services/roleApi.Slice";
import { useGetApplicationQuery } from "../../../services/applicationApiSlice";
import { useState } from "react";
import InputCheckboxGroup from "../../../components/elements/Input/InputCheckboxGroup";
import uuid from "react-uuid";
import { useRegisterMutation } from "../../../services/userApiSlice";
import SingleLineInput from "../../../components/elements/Input/SIngleLineInput";

export default function FormAddUser() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [addedUser, setAddedUser] = useState([]);
    const [selectedRoleId, setSelectedRoleId] = useState("");

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
            authorizedApplications: [],
        },
        mode: "onChange",
    });

    const {
        register: registerAllUser,
        handleSubmit: handleSubmitAllUser,
        reset: resetAllUser,
        formState: { errors: allUserErrors },
    } = useForm({});

    const onSubmitAddedUser = (data) => {
        console.log(data);
        const id = uuid();
        setAddedUser((prev) => [...prev, { ...data, id }]);
        reset({
            email: "",
            firstName: "",
            lastName: "",
            nik: "",
            roleId: selectedRoleId,
            authorizedApplications: [],
        });
    };

    const [addUser, { isLoading }] = useRegisterMutation();

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
            console.log("Success");
            await addUser(request).unwrap();
            setAddedUser([]);
            resetAllUser();
        } catch (error) {
            console.error(error);
        }
    };

    const dataApp = [
        {
            no: 1,
            id: "0159b3d1-e447-4f3e-8ec9-16cc057af562",
            name: "Team-ME",
            photo: "",
            url: "brm.metrodataacademy.id",
        },
        {
            no: 2,
            id: "3e163d67-10fa-4bf3-a333-f1cf5693848c",
            name: "Test-ME",
            photo: "",
            url: "brm.metrodataacademy.id",
        },
        {
            no: 3,
            id: "4cec1550-1951-44c3-9676-2b3907d86107",
            name: "Pick-ME",
            photo: "",
            url: "brm.metrodataacademy.id",
        },
        {
            no: 4,
            id: "6e3014be-69b6-402e-9206-db0513438779",
            name: "Recruit-ME",
            photo: "",
            url: "brm.metrodataacademy.id",
        },
        {
            no: 5,
            id: "d2b0b2e3-0291-49be-a41c-e46bd22e8afe",
            name: "BRM",
            photo: "",
            url: "brm.metrodataacademy.id",
        },
        {
            no: 6,
            id: "de036a71-0ee4-49a2-9916-0d4cd2872cc1",
            name: "CV-ME",
            photo: "",
            url: "brm.metrodataacademy.id",
        },
        {
            no: 7,
            id: "f0c464d0-f01d-4343-9d98-10bc838751b2",
            name: "Metrodata Academy",
            photo: "",
            url: "brm.metrodataacademy.id",
        },
    ];

    const roles = {
        code: 200,
        status: "OK",
        message: "Data found",
        data: [
            {
                id: "30d9dd78-6cce-433e-9989-e26c57b7caf1",
                roleName: "Admin",
            },
            {
                id: "f3ccbbac-27a9-4d62-a052-695f5270b81b",
                roleName: "Employee",
            },
        ],
    };

    console.log(addedUser);

    return (
        <>
            <div className='w-full px-8'>
                <div className='text-xl mb-2 font-semibold'>
                    Fill in User Data
                </div>
                <div className='border border-gray-300 rounded-md px-8 py-6'>
                    <form
                        className='flex grow basis-2/3 flex-col items-start gap-4'
                        onSubmit={handleSubmit(onSubmitAddedUser)}
                    >
                        <table className='w-full'>
                            <tr className='border-b-2'>
                                <td className='font-semibold text-lg px-8'>
                                    <label htmlFor='email'>Email</label>
                                </td>
                                <td className='w-80 flex py-4'>
                                    <SingleLineInput
                                        {...register("email", {
                                            required: "Email is required",
                                            maxLength: {
                                                value: 100,
                                                message: "Max 100 Character",
                                            },
                                        })}
                                        error={formErrors.email?.message}
                                        label='Email'
                                        required
                                        className='w-full'
                                    />
                                </td>
                            </tr>
                            <tr className='border-b-2'>
                                <td className='font-semibold text-lg px-8'>
                                    <label htmlFor='first-name'>
                                        First Name
                                    </label>
                                </td>
                                <td className='w-80 flex py-4'>
                                    <SingleLineInput
                                        {...register("firstName")}
                                        error={formErrors.firstName?.message}
                                        label='First Name'
                                        required
                                        className='w-full'
                                    />
                                </td>
                            </tr>
                            <tr className='border-b-2'>
                                <td className='font-semibold text-lg px-8'>
                                    <label htmlFor='last-name'>Last Name</label>
                                </td>
                                <td className='w-80 flex py-4'>
                                    <SingleLineInput
                                        {...register("lastName")}
                                        error={formErrors.lastName?.message}
                                        label='Last Name'
                                        required
                                        className='w-full'
                                    />
                                </td>
                            </tr>
                            <tr className='border-b-2'>
                                <td className='font-semibold text-lg px-8'>
                                    <label htmlFor='nik'>NIK</label>
                                </td>
                                <td className='w-80 flex py-4'>
                                    <SingleLineInput
                                        {...register("nik")}
                                        error={formErrors.nik?.message}
                                        label='NIK'
                                        required
                                        className='w-full'
                                    />
                                </td>
                            </tr>
                            <tr className='border-b-2'>
                                <td className='font-semibold text-lg px-8'>
                                    <label htmlFor='role'>Role</label>
                                </td>
                                <td className='w-80 flex py-4'>
                                    <DropdownInput
                                        placeholder='--- Select Role ---'
                                        required
                                        className='w-full'
                                        value={selectedRoleId}
                                        onChange={(e) => {
                                            setSelectedRoleId(e.target.value);
                                        }}
                                        disabled={roles.length === 0}
                                        error={
                                            roles.length === 0
                                                ? "No role available"
                                                : ""
                                        }
                                    >
                                        {roles.data.map((role) => (
                                            <option
                                                key={role.id}
                                                value={role.id}
                                            >
                                                {role.roleName}
                                            </option>
                                        ))}
                                    </DropdownInput>
                                </td>
                            </tr>
                            <tr>
                                <td className='font-semibold text-lg px-8'>
                                    Application Access
                                </td>
                                <td className='w-80 flex flex-col items-start py-4 font-light'>
                                    <div>
                                        Select At least one to activate the user
                                    </div>
                                    <InputCheckboxGroup data={dataApp} />
                                </td>
                            </tr>
                            <div></div>
                        </table>
                        <div className='grow basis-1/3 flex justify-end py-4'>
                            <Button text={"Add"} type={"submit"} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
