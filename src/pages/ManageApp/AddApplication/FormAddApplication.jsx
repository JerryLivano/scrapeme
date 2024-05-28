import { useForm } from "react-hook-form";
import SingleLineInput from "../../../components/elements/Input/SIngleLineInput";
import DropdownInput from "../../../components/elements/Input/DropdownInput";
import { useState } from "react";
import { Button } from "../../../components";

export default function FormAddApplication() {
    const [selectedStatus, setSelectedStatus] = useState("");
    const statusOptions = ["Enabled", "Disabled"];

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
            name: "",
            url: "",
            logo: "",
            status: "",
        },
        mode: "onChange",
    });

    return (
        <div className='w-full border border-gray-300 rounded-md px-8 py-6'>
            <form
                className='flex grow basis-2/3 flex-col gap-4'
                encType='multipart/form-data'
            >
                <table className='w-full'>
                    <tr className='border-b-2 items-center'>
                        <td className='font-semibold text-lg px-8'>
                            <label htmlFor='name'>Application Name</label>
                        </td>
                        <td className='w-full flex pt-2 pb-6'>
                            <div className='flex'>
                                <SingleLineInput
                                    {...register("name")}
                                    error={formErrors.email?.message}
                                    placeholder='Input Application Name Here...'
                                    label='Name'
                                    id='name'
                                    className='w-full'
                                    errorMessage={
                                        "Please enter application name"
                                    }
                                />
                            </div>
                        </td>
                    </tr>
                    <tr className='border-b-2 items-center'>
                        <td className='font-semibold text-lg px-8'>
                            <label htmlFor='url'>URL</label>
                        </td>
                        <td className='w-full flex py-6'>
                            <div className='flex'>
                                <SingleLineInput
                                    {...register("url")}
                                    error={formErrors.email?.message}
                                    startAdornment={"https://"}
                                    label='Url'
                                    id='url'
                                    className='w-full'
                                    errorMessage={
                                        "Please enter application url"
                                    }
                                />
                            </div>
                        </td>
                    </tr>
                    <tr className='border-b-2 items-center'>
                        <td className='font-semibold text-lg px-8'>
                            <label htmlFor='url'>Logo</label>
                        </td>
                        <td className='w-full flex py-6'>
                            <div className='flex'>
                                <SingleLineInput
                                    {...register("url")}
                                    error={formErrors.email?.message}
                                    startAdornment={"https://"}
                                    label='Url'
                                    id='url'
                                    className='w-full'
                                    errorMessage={
                                        "Please enter application url"
                                    }
                                />
                            </div>
                        </td>
                    </tr>
                    <tr className='items-center'>
                        <td className='font-semibold text-lg px-8'>
                            <label htmlFor='status'>Status</label>
                        </td>
                        <td className='w-full flex py-6'>
                            <DropdownInput
                                placeholder={"--- Select Status ---"}
                                required
                                className='w-1/3'
                                value={selectedStatus}
                                onChange={(e) => {
                                    setSelectedStatus(e.target.value);
                                    setValue("status", e.target.value);
                                }}
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </DropdownInput>
                        </td>
                    </tr>
                </table>
                <div className='grow basis-1/3 flex justify-end py-4'>
                    <Button text={"Save"} type={"submit"} />
                </div>
            </form>
        </div>
    );
}
