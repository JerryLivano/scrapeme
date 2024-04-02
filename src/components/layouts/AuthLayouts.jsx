import React from "react";
import { LogoMASquare } from "../../assets";

const AuthLayouts = (props) => {
    const { children, title } = { ...props };
    return (
        <>
            <div className='flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <img
                        className='w-auto h-10 mx-auto'
                        src={LogoMASquare}
                        alt='Your Company'
                    />
                    <h2 className='mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900'>
                        {title}
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    {children}
                </div>
            </div>
        </>
    );
};

export default AuthLayouts;
