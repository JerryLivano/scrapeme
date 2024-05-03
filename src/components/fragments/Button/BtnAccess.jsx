import { CheckIcon } from "@heroicons/react/20/solid"
import { useState } from "react"


export default function BtnAccess ({ isModifying, ...props }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <button
      className="flex justify-center bg-white"
      type="button"
      disabled={isModifying}
      onClick={handleClick}
      {...props}
    >
      {isChecked && <CheckIcon className="h-5 w-5 text-white bg-slate-500" />}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
        strokeWidth={1.5}
        stroke="black"
        className={`h-5 w-7 ${isChecked ? "hidden" : ""}`}
      >
        <rect x="3" y="3" width="14" height="14" rx="2" ry="2" /> </svg>
    </button>
  );
}
