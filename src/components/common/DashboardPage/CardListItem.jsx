import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { pluralize } from "../../../utils/pluralizeUtilities";

export default function CardListItem({ title, count, icon, href, bgColor }) {
    return (
        <Link to={href} className='hover:opacity-90'>
            <li
                className={twMerge(
                    "overflow-hidden rounded-xl border border-gray-200",
                    bgColor
                )}
            >
                <div className='flex items-center gap-x-4 p-6'>{icon}</div>
                <div className='-my-3 px-6 py-4 text-sm leading-6'>
                    <div className='flex justify-between gap-x-4'>
                        <div className='text-4xl font-semibold text-white'>
                            {count}
                        </div>
                    </div>
                    <div className='flex justify-between gap-x-4 pb-3'>
                        <div className='text-white'>
                            {pluralize(count, title, { onlyNoun: true })}
                        </div>
                    </div>
                </div>
            </li>
        </Link>
    );
}
