import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";

export default function ButtonDownload({ onClick }) {
    return (
        <button
            type='button'
            className='group flex items-center rounded-md bg-blue-100 p-3 text-center text-sm font-semibold text-[#3E97FF] shadow-sm hover:bg-[#3E97FF] hover:text-blue-100'
            onClick={onClick}
            title='Download Data to .XLSX'
        >
            <DocumentArrowDownIcon
                className='mr-2 h-5 w-5'
                aria-hidden='true'
            />
            Download .XLSX
        </button>
    );
}
