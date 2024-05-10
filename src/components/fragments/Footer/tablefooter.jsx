import React, { useEffect } from "react";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="bg-gray-200 px-0 py-2 w-full font-semibold text-left text-gray-700 rounded-bl-lg rounded-br-lg flex items-center justify-center">
      {range.map((el, index) => (
        <button
          key={index}
          className={`border-0 px-4 py-2 rounded-md cursor-pointer mx-2 ${
            page === el
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;