import { useEffect, useState } from "react";

export default function UsePagination({
    currentPage: currentPageInput,
    lastPage,
    shownPageNumber = 5,
    paginate,
}) {
    const [currentPage, setCurrentPage] = useState(currentPageInput);
    const nextPageNumber = currentPage === lastPage ? null : currentPage + 1;
    const previousPageNumber = currentPage <= 1 ? null : currentPage - 1;

    const pageNumbers = Array.from(Array(lastPage), (_, index) => index + 1);
    const [arrOfCurrButton, setArrOfCurrButtin] = useState([]);

    useEffect(() => {
        let tempNumbers = [...arrOfCurrButton];
        let dotsInitial = "...";
        let dotsLeft = "... ";
        let dotsRight = " ...";
        if (pageNumbers.length < 6) {
            tempNumbers = [...pageNumbers];
        } else if (currentPage >= 1 && currentPage <= 3) {
            tempNumbers = [1, 2, 3, 4, dotsInitial, pageNumbers.length];
        } else if (currentPage === 4) {
            const sliced = pageNumbers.slice(0, 5);
            tempNumbers = [...sliced, dotsInitial, pageNumbers.length];
        } else if (currentPage > 4 && currentPage < pageNumbers.length - 2) {
            //from 5 to 8 -> (10 - 2)
            let num = parseInt(currentPage);
            const sliced = pageNumbers.slice(num - 2, num + 1); //sliced1 (5-2, 5) -> [3,6]
            tempNumbers = [
                1,
                dotsLeft,
                ...sliced,
                dotsRight,
                pageNumbers.length,
            ]; // [1, ..., 4, 5, 6, ...., last]
        } else if (
            currentPage > pageNumbers.length - 3 &&
            pageNumbers.length - 3 >= 3
        ) {
            const sliced = pageNumbers.slice(pageNumbers.length - 4);
            tempNumbers = [1, dotsLeft, ...sliced];
        }
        const changed =
            JSON.stringify(tempNumbers) !== JSON.stringify(arrOfCurrButton);
        if (changed) {
            setArrOfCurrButtin(tempNumbers);
        }
    }, [arrOfCurrButton, currentPage, pageNumbers]);

    const nextPage = () => {
        if (currentPage !== lastPage && lastPage !== 0) {
            let num = parseInt(currentPage);
            setCurrentPage((current) => current + 1);
            // paginate(num + 1);
        }
    };

    const previousPage = () => {
        if (currentPage !== 1 && lastPage !== 0) {
            let num = parseInt(currentPage);
            setCurrentPage((current) => current - 1);
            // paginate(num - 1);
        }
    };

    const goToPage = (pageNumber) => {
        let number = pageNumber;
        if (pageNumber === "...") {
            number = arrOfCurrButton[arrOfCurrButton.length - 3] + 1;
        } else if (pageNumber === "... ") {
            number = arrOfCurrButton[3] - 2;
        } else if (pageNumber === " ...") {
            number = arrOfCurrButton[3] + 2;
        }
        setCurrentPage(number);
        // paginate(number);
    };

    return {
        page: {
            numbers: arrOfCurrButton,
            current: currentPage,
            next: nextPageNumber,
            previous: previousPageNumber,
            last: lastPage,
        },
        action: {
            next: nextPage,
            previous: previousPage,
            goTo: goToPage,
        },
    };
}
