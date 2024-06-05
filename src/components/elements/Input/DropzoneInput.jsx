import { LinkIcon } from "@heroicons/react/24/outline";

export default function DropzoneInput({ urlImage }) {
    return (
        <div className="flex items-center justify-center">
            <span className="mr-2">
                <LinkIcon className="w-5 h-5 text-gray-500" />
            </span>
            <div className="text-md">
                <a href={urlImage} target="__blank" className="underline">{urlImage}</a>
            </div>
        </div>
    );
};