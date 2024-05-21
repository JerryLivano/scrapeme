import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProductService } from "../../services/productService";
import FilterTable from "../../components/fragments/Filter/FilterTable";
import BtnAccess from "../../components/fragments/Button/BtnAccess";
import DropdownInput from "../../components/elements/Input/DropdownInput";
import { GridTable } from "../../components/fragments";
import BtnModify from "../../components/fragments/Button/BtnModify";
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
