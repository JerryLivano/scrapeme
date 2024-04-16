import React, { useState } from 'react'
import classNames from 'classnames';

const Toggles = () =>{
    const [isSelected, setIsSelected] = useState(false);
    return (
        <div onClick={() => setIsSelected(!isSelected)} className={classNames("flex w-14 h-7 bg-gray-500 m-10 rounded-full", 
                {"bg-blue-500":isSelected})}>
            <span className={classNames("w-7 h7 bg-white rounded-full duration-500 shadow-lg", {"ml-7":isSelected})}></span>
        
        </div>
    )
}

export default Toggles;