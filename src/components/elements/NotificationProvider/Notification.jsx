
import React, { useCallback, useEffect, useState } from 'react';
import {XMarkIcon, XCircleIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";


const Toast = ({ ...props }) => {

    let { toastType, setTypeToast } = props;
    const [visible, setVisible] = useState();
    const [listToast, setToast] = useState([]);

    const deleteToast = useCallback(id => {
        const toastListItem = listToast.filter(e => e.id !== id);
        setTypeToast(toastListItem)
    },[listToast, setTypeToast]);

    useEffect(() => {
        if (toastType != '' ) {
            setVisible(true);
            const time = setTimeout(() => {
                setVisible(false);
                deleteToast();
            }, 3000);            
            return () => clearTimeout(time);
        }

        },[listToast]);
    

    const handleExit = () => {
        setVisible(false);
        clearTimeout();
    };

    useEffect(() => {

        let toastProperties = null;        
        switch (toastType) {
            case 'success':
                toastProperties = {
                    id: listToast.length+1,
                    title: "Successfully saved",
                    description: "Anyone with a link can now view this file.",
                    textColor: "text-green-500",
                    borderColor: "border-slate-200",
                    icon: CheckCircleIcon
                };
                setToast([toastProperties]);                
                break;
            
            case 'erroremail':
                toastProperties = {
                    id: listToast.length+1,
                    title: <div style={{ color: "red" }}>Email/Password not registered</div>,
                    description: "Input the account registered by the administrator",
                    textColor: "text-red-500",
                    borderColor: "none",
                    icon: XCircleIcon
                };
                setToast([toastProperties]);
                break;

            
            case 'error':
                toastProperties = {
                    id: listToast.length+1,
                    title: <div style={{ color: "red" }}>Invalid email/password</div>,
                    description: "Input email (@mii.co.id) and password correctly",
                    textColor: "text-red-500",
                    borderColor: "none",
                    icon: XCircleIcon
                };
                setToast([toastProperties]);
                break;
            
            case 'warning':
                toastProperties = {
                    id: listToast.length+1,
                    title: "Warning Notification",
                    description: "This is a warning message.",
                    textColor: "text-yellow-500",
                    borderColor: "border-yellow-500",
                    icon: ExclamationCircleIcon
                };
                setToast([toastProperties]);                
                break;
            default:
                break;
        }

    }, [toastType]);

    return (
        <>
            {visible && (
                <div className='flex'>
                    <div className="absolute top-0 right-0 mr-4 mt-4 w-[370px]">
                        {listToast.map((toast, i) => (
                            <div key={i} className={`border ${toast.borderColor} bg-white p-4 rounded-lg shadow`}>
                                <div className="flex">
                                    <toast.icon className={`${toast.textColor} w-6 h-5 mt-1`} />
                                    <h4 className="ml-2 font-semibold">{toast.title}</h4>
                                    <button className="flex ml-auto text-slate-400" onClick={() => handleExit()}>
                                        <XMarkIcon className='w-6 h-5' />
                                    </button>
                                </div>
                                <p className="text-slate-500 ml-8">{toast.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Toast;