import { ClipLoader } from "react-spinners";

export default function Spinner() {
    return (
        <div className='my-6 flex h-full items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm'>
            <ClipLoader color='#17479D' size={45} />
        </div>
    );
}