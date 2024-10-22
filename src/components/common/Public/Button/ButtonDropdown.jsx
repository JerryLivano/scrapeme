import {
    Fragment,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { TableRef, TableScrollEvent } from "../Table/DataTable";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

export default function ButtonDropdown({ ...props }) {
    const [position, setPosition] = useState(null);

    const buttonRef = useRef(null);
    const observer = useRef(null);

    const scrollContext = useContext(TableScrollEvent);
    const tableRef = useContext(TableRef);

    const updatePosition = useCallback(() => {
        const current = buttonRef.current;
        const { top, left } = current.getBoundingClientRect();
        setPosition({
            left: left + window.scrollX,
            top: top + window.scrollY + current.clientHeight,
        });
    }, []);

    useEffect(() => {
        const remove = scrollContext?.(() => {
            updatePosition();
        });
        updatePosition();
        return () => {
            remove?.();
        };
    }, [scrollContext, updatePosition]);

    useEffect(() => {
        const table = tableRef?.current;
        if (table) {
            observer.current = new ResizeObserver(() => {
                updatePosition();
            });
            observer.current.observe(table);
            return () => {
                observer.current?.unobserve(table);
            };
        }
    }, [tableRef, updatePosition]);

    return (
        <Menu as={"div"} className={"inline-block text-left"}>
            {({ open }) => (
                <>
                    <Menu.Button
                        ref={buttonRef}
                        onClick={() => {
                            updatePosition();
                        }}
                        className='relative inline-flex w-full justify-center gap-x-3 rounded-md bg-[#F1F1F2] px-2 py-1.5 text-sm font-semibold text-[#7E8299] shadow-sm '
                    >
                        Action
                        <ChevronDownIcon
                            className='-mx-1.5 h-5 w-5 text-[#7E8299]'
                            aria-hidden='true'
                        />
                    </Menu.Button>
                    {open && position && (
                        <MenuItem position={position} {...props} />
                    )}
                </>
            )}
        </Menu>
    );
}

function MenuItem({ position, functionByActions }) {
    return (
        <Transition
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
                style={{
                    top: position.top,
                    left: position.left,
                }}
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
                                        "block cursor-pointer whitespace-nowrap px-4 py-2 text-sm"
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
    );
}
