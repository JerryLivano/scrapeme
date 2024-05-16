import { Button, InputGroup } from "../../../components";
import { useForm } from "react-hook-form";
import DropdownInput from "../../../components/elements/Input/DropdownInput";


export default function FormAddUser() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    return (
        <>
            <div className='w-full px-8'>
                <div className='text-xl mb-2 font-semibold'>
                    Fill in User Data
                </div>
                <div className='border border-gray-300 rounded-md px-8 py-6'>
                    <table className="w-full">
                        <tr className="border-b-2">
                            <td className="font-semibold text-lg px-8">Email</td>
                            <td className="w-80 flex justify-center py-4">
                                <InputGroup
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder=""
                                    errors={errors}
                                    register={register}
                                    required
                                />
                            </td>
                        </tr>
                        <tr className="border-b-2">
                            <td className="font-semibold text-lg px-8">FirstName</td>
                            <td className="w-80 flex justify-center py-4">
                                <InputGroup
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    placeholder=""
                                    errors={errors}
                                    register={register}
                                    required
                                />
                            </td>
                        </tr>
                        <tr className="border-b-2">
                            <td className="font-semibold text-lg px-8">LastName</td>
                            <td className="w-80 flex justify-center py-4">
                                <InputGroup
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    placeholder=""
                                    errors={errors}
                                    register={register}
                                    required
                                />
                            </td>
                        </tr>
                        <tr className="border-b-2">
                            <td className="font-semibold text-lg px-8">Nik</td>
                            <td className="w-80 flex justify-center py-4">
                                <InputGroup
                                    type="text"
                                    id="nik"
                                    name="nik"
                                    placeholder=""
                                    errors={errors}
                                    register={register}
                                    required
                                />
                            </td>
                        </tr>
                        <tr className="border-b-2">
                            <td className="font-semibold text-lg px-8">Role</td>
                            <td className="w-80 flex justify-center -ml-16 py-4">
                            <DropdownInput
                            // value={filterStatus}
                            // onChange={setFilterStatus}
                            className="max-w-fit"
                            />
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold text-lg px-8">Application Access</td>
                            <td className="w-80 flex justify-center py-4 font-light">
                            Select Atleast one to activate the user
                            </td> 
                        </tr>
                        <div></div>
                        
                    </table>
                    <div className="flex justify-end py-4">
                        <Button text={"Add"} type={"submit"} />
                    </div>
                </div>
            </div>
        </>
    );
}
