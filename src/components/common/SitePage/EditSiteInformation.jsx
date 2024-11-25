import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function EditSiteInformation() {
    return (
        <div className='rounded-lg bg-blue-50 px-2 outline outline-2 outline-blue-500'>
            <div className='flex py-3'>
                <div className='shrink-0'>
                    <InformationCircleIcon
                        className='h-5 w-5 text-blue-400'
                        aria-hidden='true'
                    />
                </div>
                <div className='ml-3 '>
                    <h3 className='text-sm font-bold text-gray-600'>
                        Information
                    </h3>
                    <div className='mt-2 text-sm text-blue-500'>
                        <ul role='list' className='list-disc space-y-1 pl-5'>
                            <li>
                                Each item in the pattern defines an identifier
                                and its parameters in the site URL.
                            </li>
                            <li>
                                You can customize the number of item pattern
                                sets dynamically.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
