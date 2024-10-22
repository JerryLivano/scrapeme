import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

export default function MenuItemDropdown({ showDropdown, functionByActions }) {
    return (
        <Menu as={"div"}>
            <Transition
                show={showDropdown}
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <Menu.Items
                    static
                    className={twMerge(
                        "absolute z-20 w-fit rounded-md bg-white shadow-lg focus:outline-none"
                    )}
                >
                    {functionByActions.map(({ action, onFunction }) => {
                        return (
                            <Menu.Item key={action}>
                                {({ active }) => (
                                    <a
                                        onClick={onFunction}
                                        className={twMerge(
                                            active
                                                ? "bg-[#EEF6FF] text-[#3E97FF]"
                                                : "text-[#7E8299]",
                                            "block cursor-pointer font-semibold whitespace-nowrap px-4 py-2 text-sm"
                                        )}
                                    >
                                        {action}
                                    </a>
                                )}
                            </Menu.Item>
                        );
                    })}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
