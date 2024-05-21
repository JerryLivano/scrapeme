import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function toastSuccess({ message }) {
    toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "min-w-fit whitespace-nowrap",
    });
}

export function toastError({ message }) {
    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "min-w-fit mr-8 mt-8 whitespace-nowrap",
    });
}
