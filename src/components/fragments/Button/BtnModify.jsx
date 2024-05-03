import { useState } from "react"
import { EllipsisVerticalIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"

const BtnModify = ({setModifyAccess, openModify, setOpenModify }) => {
  return (
    <td className="w-10 ml-6 mx-2 text-sm justify-center font-medium text-gray-900 sm:pl-0">
      <button
        className="font-bold text-black py-3 mt-2 px-4 rounded"
        type="button"
        onClick={() => {
          setModifyAccess(true);
          setOpenModify((prevState) => (prevState === null ? "check" : prevState === "check" ? null : "check"));
        }}
      >
        {openModify === null ? (
          <EllipsisVerticalIcon />
        ) : openModify === "check" ? (
          <CheckIcon />
        ) : (
          <XMarkIcon />
        )}

    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke=""
        className={`h-3 w-5`}
    >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"
        />
    </svg>

      </button>
    </td>
  );
};

export default BtnModify;


