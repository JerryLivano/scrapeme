import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import ButtonIcon from "../../elements/Button/ButtonIcon";
import { userNavigation } from "../Sidebar/data";
import { useNavigate } from "react-router";
import { AuthService } from "../../../services/authServices"

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

//#region Ari test
const data = JSON.parse(localStorage.getItem("data"));
//#endregion

const Header = (props) => {
    const [openProfile, setOpenProfile] = useState(false);
    const { setSidebarOpen } = { ...props };
    
    const [userRole, setUserRole] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();    
    const navigate = useNavigate();    
    
    
    //#region Ari handle logout button
    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        navigate("/login");
    };
    //#endregion


    useEffect(() => {
        const role = AuthService.getUserRole();
        setUserRole(role)

        const username = AuthService.getUserName();
        setUsername(username);

        const email = AuthService.getUserEmail();
        setEmail(email);
    })

    return (
        <>
            <div className='sticky top-0 z-40 flex items-center h-16 px-4 bg-white border-b border-gray-200 shadow-sm shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8'>
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

                <div className='flex self-stretch flex-1 gap-x-4 lg:gap-x-6'>
                    <form
                        className='relative flex flex-1'
                        action='#'
                        method='GET'
                    >
                        <label htmlFor='search-field' className='sr-only'>
                            Search
                        </label>
                        <MagnifyingGlassIcon
                            className='absolute inset-y-0 w-5 h-full text-gray-400 pointer-events-none left-1'
                            aria-hidden='true'
                        />
                        <input
                            id='search-field'
                            className='block w-full h-full py-0 pl-8 pr-0 text-gray-900 border-0 placeholder:text-gray-400 focus:ring-0 sm:text-sm'
                            placeholder='Search...'
                            type='search'
                            name='search'
                        />
                    </form>
                    <div className='flex items-center gap-x-4 lg:gap-x-6'>
                        <ButtonIcon>
                            <span className='sr-only'>Hallo</span>
                            <BellIcon className='w-6 h-6' aria-hidden='true' />
                        </ButtonIcon>

                        {/* Separator */}
                        <div
                            className='hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200'
                            aria-hidden='true'
                        />

                        {/* Profile dropdown */}
                        <Menu as='div' className='relative'>
                            <Menu.Button className='-m-1.5 flex items-center p-1.5'>
                                <span className='sr-only'>Open user menu</span>
                                <div className='w-8 h-8 rounded-full bg-gray-50'>
                                    <span className='inline-block w-8 h-8 overflow-hidden bg-gray-100 rounded-full'>
                                        <svg
                                            className='w-full h-full text-gray-300'
                                            fill='currentColor'
                                            viewBox='0 0 24 24'
                                        >
                                            <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                                        </svg>
                                    </span>
                                </div>

                                <span
                                    className='hidden lg:flex lg:items-center'
                                    onClick={() => setOpenProfile(!openProfile)}
                                >
                                    <span
                                        className='ml-4 text-sm font-semibold leading-6 text-gray-900'
                                        aria-hidden='true'
                                    >
                                        {username}

                                    </span>
                                    {openProfile ? (
                                        <ChevronDownIcon
                                            className='w-5 h-5 ml-2 text-gray-400'
                                            aria-hidden='true'
                                        />
                                    ) : (
                                        <ChevronRightIcon
                                            className='w-5 h-5 ml-2 text-gray-400'
                                            aria-hidden='true'
                                        />
                                    )}
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
                                <Menu.Items className='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
                                    {userNavigation.map((item, index) => (
                                        <Menu.Item
                                            key={index}
                                            className='focus-visible:bg-none hover:text-blue-400'
                                        >
                                            {({ active }) =>
                                                item.name === "Sign out" ? (
                                                    <button
                                                        //#region Ari test logout
                                                        onClick={() =>
                                                            handleLogout()
                                                        }
                                                        className='flex justify-center px-3 py-1 text-sm bg-none hover:bg-none justify-self-center'
                                                        //#endregion
                                                    >
                                                        {item.name}
                                                    </button>
                                                ) : (
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            active
                                                                ? "bg-gray-50"
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
