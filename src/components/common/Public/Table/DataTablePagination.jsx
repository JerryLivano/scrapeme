import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/solid";

export default function DataTablePagination({
    pageIndex,
    pageCount,
    dataCount,
    pageValue,
    goToPage,
    paginationLength,
}) {
    return (
        <>
            <div className='flex justify-between items-center w-full'>
                <div className='px-4'>
                    Showing{" "}
                    <b>{dataCount === 0 ? 0 : pageIndex * pageValue + 1}</b> to{" "}
                    <b>
                        {(pageIndex + 1) * pageValue > dataCount
                            ? dataCount
                            : (pageIndex + 1) * pageValue}
                    </b>{" "}
                    of <b>{dataCount}</b> results
                </div>
                <div className='flex items-center space-x-2'>
                    <PaginationPageArrow
                        icon={<ChevronDoubleLeftIcon className='h-5 w-5' />}
                        disabled={pageIndex === 0}
                        onClick={() => goToPage(0)}
                    />

                    <PaginationPageArrow
                        icon={<ChevronLeftIcon className='h-5 w-5' />}
                        disabled={pageIndex === 0}
                        onClick={() => goToPage(pageIndex - 1)}
                    />

                    {generatePaginationNumber(
                        paginationLength,
                        pageIndex,
                        pageCount,
                        goToPage
                    )}

                    <PaginationPageArrow
                        icon={<ChevronRightIcon className='h-5 w-5' />}
                        disabled={pageIndex === Math.max(0, pageCount - 1)}
                        onClick={() => goToPage(pageIndex + 1)}
                    />

                    <PaginationPageArrow
                        icon={<ChevronDoubleRightIcon className='h-5 w-5' />}
                        disabled={pageIndex === Math.max(0, pageCount - 1)}
                        onClick={() => goToPage(pageCount - 1)}
                    />
                </div>
            </div>
        </>
    );
}

function generatePaginationNumber(
    paginationLength,
    pageIndex,
    pageCount,
    goToPage
) {
    if (paginationLength > pageCount) {
        paginationLength = pageCount;
    }
    const paginationNumbers = [];
    for (let i = 0; i < paginationLength; i++) {
        let pageNum;
        if (pageIndex < Math.floor(paginationLength / 2)) {
            pageNum = i + 1;
        } else if (paginationLength + pageIndex > pageCount) {
            pageNum = pageCount - paginationLength + i + 1;
        } else {
            pageNum = pageIndex + i + 1 - Math.floor(paginationLength / 2);
        }
        paginationNumbers.push(
            <PaginationPageNumber
                key={pageNum}
                visible={true}
                active={pageNum === pageIndex + 1}
                number={pageNum}
                onClick={() => goToPage(pageNum - 1)}
            />
        );
    }
    return paginationNumbers;
}

function PaginationPageNumber({ visible, active, number, onClick }) {
    return (
        <div>
            {visible && (
                <button
                    onClick={onClick}
                    className={
                        "relative inline-flex items-center justify-center text-base font-semibold w-8 h-8 rounded-md " +
                        (active
                            ? "bg-[#3E97FF] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#54a2fb]"
                            : "text-gray-900 hover:bg-gray-50 focus:outline-offset-0")
                    }
                >
                    {number}
                </button>
            )}
        </div>
    );
}

function PaginationPageArrow({ icon, disabled, onClick }) {
    return disabled ? (
        <div className='h-8 w-4'></div>
    ) : (
        <button
            className='relative inline-flex h-8 w-8 items-center justify-center hover:opacity-70 focus:z-20 focus:outline-offset-0'
            onClick={onClick}
        >
            {icon}
        </button>
    );
}
