import { NavLink } from "react-router-dom";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    CodeBracketIcon,
    HomeIcon,
    LinkIcon,
    TagIcon,
    UsersIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const submenuScrape = [
    {
        name: "Web Scraping",
    },
    {
        name: "Manage Template",
        href: "template",
    },
    {
        name: "Favorite Scraped Data",
        href: "favorite",
    },
    {
        name: "Scrape History",
        href: "history",
    },
];

const navigation = [
    {
        name: "Dashboard",
        href: "dashboard",
        icon: HomeIcon,
    },
    {
        name: "Scrape Menu",
        href: "scrape",
        submenu: submenuScrape,
        suffixIcon: ChevronDownIcon,
        icon: CodeBracketIcon,
    },
    {
        name: "Manage Site",
        href: "site",
        icon: LinkIcon,
    },
    {
        name: "Manage Category",
        href: "category",
        icon: TagIcon,
    },
    {
        name: "Manage Account",
        href: "account",
        icon: UsersIcon,
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function NavItems() {
    const [allowedNav, setAllowedNav] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isScrapeMenuOpen, setIsScrapeMenuOpen] = useState(false);

    useEffect(() => {
        const allowedNavigation = navigation.map((nav) => {
            if (nav.href === "scrape") {
                return {
                    ...nav,
                    submenu: nav.submenu,
                };
            } else {
                return nav;
            }
        });
        setAllowedNav(allowedNavigation);
    }, []);

    useEffect(() => {
        setIsScrapeMenuOpen(
            submenuScrape.some((nav) =>
                nav.href
                    ? location.pathname === `/scrape/${nav.href}`
                    : location.pathname === "/scrape"
            )
        );
    }, [location.pathname]);

    const toggleSubmenuScrape = () => {
        setIsScrapeMenuOpen(!isScrapeMenuOpen);
    };

    return (
        <nav className='flex flex-1 flex-col'>
            <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                <li>
                    <ul role='list' className='-mx-2 space-y-2'>
                        {allowedNav.map((item) => (
                            <li key={item.name}>
                                {item.submenu ? (
                                    <div>
                                        <NavLink
                                            key={item.name}
                                            to={
                                                item.href === "scrape"
                                                    ? !isScrapeMenuOpen
                                                        ? item.href
                                                        : null
                                                    : null
                                            }
                                            onClick={() => {
                                                if (item.href === "scrape") {
                                                    toggleSubmenuScrape();
                                                }
                                            }}
                                            className={({ isActive }) =>
                                                classNames(
                                                    isActive
                                                        ? "bg-[#17479D] text-white"
                                                        : "text-[#A1A5B7] hover:text-white hover:bg-[#17479D]",
                                                    "group h-14 flex gap-x-3 rounded-2xl p-4 text-sm leading-6 font-bold"
                                                )
                                            }
                                        >
                                            <div className='flex w-full items-center justify-between'>
                                                <div className='flex items-center gap-x-3'>
                                                    <item.icon
                                                        className={classNames(
                                                            {
                                                                isActive:
                                                                    "text-white",
                                                            },
                                                            "mr-2 h-6 w-6"
                                                        )}
                                                        aria-hidden='true'
                                                    />
                                                    <span>{item.name}</span>
                                                </div>

                                                {item.submenu && (
                                                    <div className='flex items-center gap-x-3 transition-transform'>
                                                        {item.href ===
                                                            "scrape" && (
                                                            <>
                                                                {isScrapeMenuOpen ? (
                                                                    <ChevronUpIcon
                                                                        className={classNames(
                                                                            {
                                                                                isActive:
                                                                                    "text-white",
                                                                            },
                                                                            "h-6 w-6"
                                                                        )}
                                                                        aria-hidden='true'
                                                                    />
                                                                ) : (
                                                                    <ChevronDownIcon
                                                                        className={classNames(
                                                                            {
                                                                                isActive:
                                                                                    "text-white",
                                                                            },
                                                                            "h-6 w-6"
                                                                        )}
                                                                        aria-hidden='true'
                                                                    />
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </NavLink>
                                        {isScrapeMenuOpen && (
                                            <ul
                                                className={classNames(
                                                    {
                                                        hidden: !isScrapeMenuOpen,
                                                    },
                                                    "mt-2 pl-2 transition-all duration-300 transform"
                                                )}
                                            >
                                                {item.href === "scrape" &&
                                                    item.submenu.map(
                                                        (submenuItem) => (
                                                            <li
                                                                key={
                                                                    submenuItem.name
                                                                }
                                                                className={classNames(
                                                                    "mt-2 pl-2 transition-all duration-300 transform"
                                                                )}
                                                            >
                                                                <NavLink
                                                                    key={
                                                                        submenuItem.name
                                                                    }
                                                                    to={
                                                                        !submenuItem.href 
                                                                            ? item.href
                                                                            : `${item.href}/${submenuItem.href}`
                                                                    }
                                                                    end
                                                                    className={({
                                                                        isActive,
                                                                    }) =>
                                                                        classNames(
                                                                            isActive
                                                                                ? "bg-[#17479D] text-white"
                                                                                : "text-[#A1A5B7] hover:bg-[#17479D] hover:text-white",
                                                                            "group hover:text-white flex h-12 w-full gap-x-3 rounded-2xl p-4 text-left text-sm font-bold leading-4 hover:bg-[#17479D]"
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        submenuItem.name
                                                                    }
                                                                </NavLink>
                                                            </li>
                                                        )
                                                    )}
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <NavLink
                                        to={item.href}
                                        className={({ isActive }) =>
                                            classNames(
                                                isActive
                                                    ? "bg-[#17479D] text-white"
                                                    : "text-[#A1A5B7] hover:text-white hover:bg-[#17479D]",
                                                "group h-14 flex gap-x-3 rounded-2xl p-4 text-sm leading-6 font-bold"
                                            )
                                        }
                                    >
                                        <div className='flex w-full items-center justify-between'>
                                            <div className='flex items-center gap-x-3'>
                                                <item.icon
                                                    className={classNames(
                                                        {
                                                            isActive:
                                                                "text-white",
                                                        },
                                                        "mr-2 h-6 w-6"
                                                    )}
                                                    aria-hidden='true'
                                                />
                                                {item.name}
                                            </div>
                                        </div>
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </nav>
    );
}
