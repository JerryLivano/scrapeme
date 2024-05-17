import FormAddUser from "./FormAddUser";
import TemporaryAddUserTable from "./TemporaryAddUserTable";

export default function AddUser() {
    return (
        <>
            <div className='flex flex-col items-center mb-4'>
                <div className='text-3xl mt-4 font-semibold'>Add User Data</div>
            </div>
            <FormAddUser />
        </>
    );
}
