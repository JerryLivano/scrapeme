import React from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
import AddUser from "./AddUser";

const ManageUser = () => {
    const navigate = useNavigate();
    const HandleAddUser = () => {
        navigate("/add-user");
    };

    return (
        <>
            <div className='flex flex-col items-center mb-4'>
                <div className='text-3xl mt-4 font-semibold'>Manage User</div>
            </div>
            <div className='mt-10'>
                <UserTable />
            </div>
        </>
    );
};
export default ManageUser;
