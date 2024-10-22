import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { removeAuthToken } from "../../../utils/authUtilities";
import ModalConfirmLogOut from "../../common/Public/Confirmation/ModalConfirmLogout";

export default function LogoutButton() {
    const [showModalConfirmLogOut, setShowModalConfirmLogOut] = useState(false);
    const navigate = useNavigate();

    const logOutHandler = () => {
        removeAuthToken();
        navigate("/", { replace: true });
    };

    return (
        <>
            <button
                type='button'
                className='-m-2.5 p-2.5'
                onClick={() => setShowModalConfirmLogOut(true)}
                title='Log Out'
            >
                <ArrowRightStartOnRectangleIcon
                    className='h-6 w-6 text-red-600 hover:text-red-800'
                    aria-hidden='true'
                />
            </button>

            <ModalConfirmLogOut
                onLogOutHandler={logOutHandler}
                title='Confirm Log Out'
                message={`Are you sure want to Log Out?`}
                openModalConfirmLogOut={showModalConfirmLogOut}
                setOpenModalConfirmLogOut={setShowModalConfirmLogOut}
            />
        </>
    );
}
