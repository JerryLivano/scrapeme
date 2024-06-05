import { Outlet } from "react-router-dom";
import { LogoMASquare } from "../../assets/imageList";

const AuthLayout = () => {
    return (
        <>
            <div className='flex flex-col justify-center flex-1 min-h-full px-6 py-20 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <img
                        className='w-auto h-24 mx-auto'
                        src={LogoMASquare}
                        alt='Logo Descriptions'
                    />
                    <h2 className='text-3xl font-bold leading-9 tracking-wider text-center text-blue-800'>
                        Portal-ME
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    {/* Content */}
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default AuthLayout;
