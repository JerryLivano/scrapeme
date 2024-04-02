import React from "react";

export default function Title({ children }) {
    return (
        <div className='text-black text-2xl font-bold'>
            {children}
        </div>
    );
}
