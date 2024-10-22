import { Link } from "react-router-dom";

export default function RegisterButton() {
    return (
        <div className='mt-2 sm:mx-auto sm:w-full sm:max-w-sm'>
            <h2 className='text-left text-sm font-medium leading-9 tracking-tight text-[#A1A5B7]'>
                Don't have account?{" "}
                <Link to='register'>
                    <span className='text-[#0D5CC6] hover:text-[#3d7cd1] cursor-pointer'>
                        Register Now
                    </span>
                </Link>
            </h2>
        </div>
    );
}
