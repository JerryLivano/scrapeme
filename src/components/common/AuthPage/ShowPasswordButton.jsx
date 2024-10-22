import {EyeSlashIcon, EyeIcon} from "@heroicons/react/24/solid";

export default function ShowPasswordButton({
    active,
    setActive
}) {
    return (
        <div
            className="h-5 w-5 cursor-pointer"
            onClick={() => setActive(!active)}
        >
            {active ? <EyeSlashIcon /> : <EyeIcon />}
        </div>
    )
}