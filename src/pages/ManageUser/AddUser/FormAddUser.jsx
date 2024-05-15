import { Button } from "../../../components";

export default function FormAddUser() {
    return (
        <>
            <div className='w-full'>
                <div className='text-xl mb-2 font-semibold'>
                    Fill in User Data
                </div>
                <div className='border border-gray-300 rounded-md px-8 py-6'>
                    <table>
                        <tr>
                            <td>Email</td>
                        </tr>
                    </table>
                    <div className="flex justify-end">
                        <Button text={"Add"} type={"submit"} />
                    </div>
                </div>
            </div>
        </>
    );
}
