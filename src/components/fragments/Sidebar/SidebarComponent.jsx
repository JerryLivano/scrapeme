import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { navigation, teams } from "./data";
import { LogoPortalMe } from "../../../assets/imageList";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const SidebarComponent = () => {
    return (
        <div className='flex flex-col px-6 pb-4 overflow-y-auto bg-[#C4D1E2] border-r border-gray-200 grow gap-y-5'>
            <div className='flex items-center self-center h-20 w-52 shrink-0'>
                <img
                    src={LogoPortalMe}
                    alt='Portal Me'
                    className='w-52 h-14 mx-auto'
                />
            </div>

            <nav className='flex flex-col flex-1 -mt-5 ml-2'>
                <ul role='list' className='flex flex-col flex-1 gap-y-7'>
                    <li>
                        <ul role='list' className='-mx-2'>
                            {navigation.map((item) => (
                                <li className='my-3' key={item.name}>
                                    {!item.children ? (
                                        <a
                                            href={item.href}
                                            className={classNames(
                                                location.pathname.includes(
                                                    item.href
                                                )
                                                    ? "bg-gray-50"
                                                    : "text-gray-700 hover:text-blue-950 hover:bg-gray-50",
                                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                            )}
                                            aria-current={
                                                location.pathname.includes(
                                                    item.href
                                                )
                                                    ? "page"
                                                    : undefined
                                            }
                                        >
                                            <item.icon
                                                className={classNames(
                                                    location.pathname.includes(
                                                        item.href
                                                    )
                                                        ? "text-blue-950"
                                                        : "text-blue-950 ",
                                                    "h-6 w-6 shrink-0"
                                                )}
                                                aria-hidden='true'
                                            />
                                            {item.name}
                                        </a>
                                    ) : (
                                        <Disclosure as='div' key={item.name}>
                                            {({ open }) => (
                                                <>
                                                    <Disclosure.Button
                                                        className={classNames(
                                                            location.pathname.includes(
                                                                item.href
                                                            )
                                                                ? "bg-gray-50 text-indigo-600"
                                                                : "hover:bg-gray-50 hover:text-indigo-600",
                                                            "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700"
                                                        )}
                                                    >
                                                        <item.icon
                                                            className={classNames(
                                                                location.pathname.includes(
                                                                    item.href
                                                                )
                                                                    ? "text-indigo-600"
                                                                    : "text-gray-400 hover:text-indigo-600",
                                                                "w-6 h-6 shrink-0"
                                                            )}
                                                            aria-hidden='true'
                                                        />
                                                        {item.name}
                                                        <ChevronRightIcon
                                                            className={classNames(
                                                                open
                                                                    ? "rotate-90 text-gray-500"
                                                                    : "text-gray-400",
                                                                "ml-auto h-5 w-5 shrink-0"
                                                            )}
                                                            aria-hidden='true'
                                                        />
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel
                                                        as='ul'
                                                        className='px-2 mt-1'
                                                    >
                                                        {item.children.map(
                                                            (subItem) => (
                                                                <li
                                                                    key={
                                                                        subItem.name
                                                                    }
                                                                >
                                                                    {/* 44px */}
                                                                    <Disclosure.Button
                                                                        as='a'
                                                                        href={
                                                                            subItem.href
                                                                        }
                                                                        className={classNames(
                                                                            subItem.href ===
                                                                                `${location.pathname}`
                                                                                ? "bg-gray-50 text-indigo-600"
                                                                                : "hover:bg-gray-50 hover:text-indigo-600",
                                                                            "block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700"
                                                                        )}
                                                                    >
                                                                        {
                                                                            subItem.name
                                                                        }
                                                                    </Disclosure.Button>
                                                                </li>
                                                            )
                                                        )}
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </li>
                    {/* <li>
                        <div className='text-xs font-semibold leading-6 text-gray-400'>
                            Your teams
                        </div>
                        <ul role='list' className='mt-2 -mx-2 space-y-1'>
                            {teams.map((team) => (
                                <li key={team.name}>
                                    <a
                                        href={team.href}
                                        className={classNames(
                                            team.current
                                                ? "bg-gray-50 text-indigo-600"
                                                : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                                        )}
                                    >
                                        <span
                                            className={classNames(
                                                team.current
                                                    ? "text-indigo-600 border-indigo-600"
                                                    : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                                                "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white",
                                            )}
                                        >
                                            {team.initial}
                                        </span>
                                        <span className='truncate'>
                                            {team.name}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </li> */}
                    {/* <li className='mt-auto'>
                        <a
                            href='/settings'
                            className='flex p-2 -mx-2 text-sm font-semibold leading-6 text-gray-700 rounded-md group gap-x-3 hover:bg-gray-50 hover:text-indigo-600'
                        >
                            <Cog6ToothIcon
                                className='w-6 h-6 text-gray-400 shrink-0 group-hover:text-indigo-600'
                                aria-hidden='true'
                            />
                            Settings
                        </a>
                    </li> */}
                </ul>
            </nav>
        </div>
    );
};

export default SidebarComponent;
