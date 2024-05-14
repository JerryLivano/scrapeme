import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
    Bars3Icon,
    ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import ButtonIcon from "../../elements/Button/ButtonIcon";
import { userNavigation } from "../Sidebar/data";
import UserProfile from "./Userprofile";
import { useNavigate } from "react-router";
import { AuthService } from "../../../services/authService";
import {
    extractName,
    extractRole,
    getAuthToken,
    removeAuthToken,
} from "../../../utils/authUtilities";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Header = (props) => {
    const [openProfile, setOpenProfile] = useState(false);
    const { setSidebarOpen } = { ...props };

    const [name, setName] = useState("User");
    const [role, setRole] = useState("User");

    const navigate = useNavigate();

    //#region Ari handle logout button
    const handleLogout = () => {
        removeAuthToken();
        navigate("/login");
    };

    useEffect(() => {
        const token = getAuthToken();
        if (!token) return;
        setName(extractName(token));
        setRole(extractRole(token));
    }, []);

    //#endregion

    // useEffect(() => {
    //     const role = AuthService.getUserRole();
    //     setUserRole(role);

    //     //     const username = AuthService.getUserName();
    //     //     setUsername(username);

    //     //     const email = AuthService.getUserEmail();
    //     //     setEmail(email);
    // });

    return (
        <>
            <div className='sticky top-0 z-40 flex items-center h-16 px-4 bg-white border-2 border-gray-200 shadow-sm shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8'>
                <ButtonIcon
                    className='-m-2.5 p-2.5 text-gray-700 lg:hidden'
                    onClick={() => setSidebarOpen(true)}
                >
                    <span className='sr-only'>Open sidebar</span>
                    <Bars3Icon
                        className='w-6 h-6 lg:hidden'
                        aria-hidden='true'
                    />
                </ButtonIcon>

                {/* Separator */}
                <div
                    className='w-px h-6 bg-gray-200 lg:hidden'
                    aria-hidden='true'
                />
                <div className='flex flex-1 justify-end gap-x-4 mx-12 lg:gap-x-6'>
                    <div className='flex items-end gap-x-4 lg:gap-x-6'>
                        <Menu as='div' className='relative'>
                            <Menu.Button className='flex hover:bg-slate-200 rounded-lg items-center p-1.5'>
                                <span className='sr-only'>Open user menu</span>
                                <span
                                    className='hidden lg:flex lg:items-center'
                                    onClick={() => setOpenProfile(!openProfile)}
                                >
                                    <span
                                        className='mx-4 text-sm font-semibold leading-6 text-black'
                                        aria-hidden='true'
                                    >
                                        {name}
                                    </span>
                                </span>
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter='transition ease-out duration-100'
                                enterFrom='transform opacity-0 scale-95'
                                enterTo='transform opacity-100 scale-100'
                                leave='transition ease-in duration-75'
                                leaveFrom='transform opacity-100 scale-100'
                                leaveTo='transform opacity-0 scale-95'
                            >
                                <Menu.Items className='absolute right-0 z-10 mt-2.5 w-48 rounded-lg origin-top-rightrounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
                                    {userNavigation.map((item, index) => (
                                        <Menu.Item
                                            key={index}
                                            className='focus-visible:bg-none hover:text-blue-400 '
                                        >
                                            {({ active }) =>
                                                item.name === "Sign out" ? (
                                                    <button
                                                        //#region Ari test logout
                                                        onClick={() =>
                                                            handleLogout()
                                                        }
                                                        className='flex justify-start px-3 py-2 text-sm hover:bg-gray-100 w-48 justify-self-center'
                                                        //#endregion
                                                    >
                                                        {item.name}
                                                    </button>
                                                ) : (
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            active
                                                                ? "bg-gray-100"
                                                                : "",
                                                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                        )}
                                                    >
                                                        {item.name}
                                                    </a>
                                                )
                                            }
                                        </Menu.Item>
                                    ))}
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
