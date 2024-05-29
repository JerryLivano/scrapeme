import { XMarkIcon } from "@heroicons/react/24/outline";
import ImageCropper from "../../../components/elements/Image/ImageCropper"

const Modal = ({ closeModal, updateAvatar }) => {
  return (
    <div
      className="relative z-50"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-white bg-opacity-50 transition-all"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center">
          <div className="flex w-[55%] ml-72 sm:w-[60%] mt-20 mb-10 min-h-[60vh] rounded-2xl bg-blue-100 text-slate-100 text-left shadow-xl transition-all">
            <div className="px-5 py-4 w-full inline-flex">
            <ImageCropper
                updateAvatar={updateAvatar}
                closeModal={closeModal}
            />
              <button
                type="button"
                className="rounded-md p-1justify-end flex w-8 h-6 text-black hover:bg-gray-700 focus:outline-none"
                onClick={closeModal}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon />
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
