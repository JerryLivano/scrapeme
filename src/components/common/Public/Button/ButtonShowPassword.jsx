import {EyeSlashIcon, EyeIcon} from "@heroicons/react/24/solid";

export default function ButtonShowPassword({
    active,
    setActive
}) {
    return (
        <div
            className="h-5 w-5 text-gray-500 cursor-pointer"
            onClick={() => setActive(!active)}
        >
            {active ? <EyeSlashIcon /> : <EyeIcon />}
        </div>
    )
}