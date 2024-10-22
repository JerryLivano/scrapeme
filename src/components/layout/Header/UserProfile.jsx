import { useEffect, useState } from "react";
import {
    getAuthToken,
    extractName,
    extractRole,
    extractGuid,
} from "../../../utils/authUtilities";
import { RoleNames } from "../../../utils/roleUtilities";
import MenuItemDropdown from "../../common/Public/Button/MenuItemDropdown";
import { NavLink } from "react-router-dom";
import FormModalChangePassword from "../../common/AccountPage/FormModalChangePassword";
import { useGetAccountQuery } from "../../../services/account/accountApiSlice";
import FormModalEditAccount from "../../common/AccountPage/FormModalEditAccount";

export default function UserProfile() {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const [showDropdown, setShowDropdown] = useState(false);
    const [changePwModal, setChangePwModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const { data: account, isSuccess } = useGetAccountQuery(
        extractGuid(getAuthToken())
    );

    useEffect(() => {
        const token = getAuthToken();
        if (!token) return;
        setName(extractName(token));
        const roles = extractRole(token);
        for (const roleName of RoleNames) {
            if (roles.role_name.includes(roleName.role)) {
                setRole(roleName.name);
                break;
            }
        }
    }, []);

    return (
        <>
            <div className='relative'>
                <div className='-m-1 flex items-center p-1'>
                    <div className='hidden items-start lg:flex lg:flex-col'>
                        <NavLink
                            className={
                                "hover:bg-[#ededed] px-3 py-1 rounded-md hover:opacity-70"
                            }
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <div className='text-base font-bold text-gray-900'>
                                {name}
                            </div>
                            <div className='text-sm font-semibold text-gray-400'>
                                {role}
                            </div>
                        </NavLink>
                        <MenuItemDropdown
                            showDropdown={showDropdown}
                            functionByActions={[
                                {
                                    action: "Edit Account",
                                    onFunction: () => setEditModal(true),
                                },
                                {
                                    action: "Change Password",
                                    onFunction: () => {
                                        setChangePwModal(true);
                                        setShowDropdown(false);
                                    },
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>

            {isSuccess && (
                <FormModalEditAccount
                    open={editModal}
                    setOpen={setEditModal}
                    account={account.data}
                />
            )}

            <FormModalChangePassword
                accountGuid={extractGuid(getAuthToken())}
                open={changePwModal}
                setOpen={setChangePwModal}
            />
        </>
    );
}
