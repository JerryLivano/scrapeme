// import { useContext, useState } from "react";
// import NotificationContext from "../../elements/NotificationProvider";

    
// const Notification = (props) => {    

//     const {showNotification, type, message} = useContext(NotificationContext);
//     return (
//     <> 
//         {showNotification &&(
//                 <div className="fixed top-0 right-4 bg-white p-2 m-4">
//                     {type ==='success' && <p className="text-blue-500 ">{message}</p>}                    
//                     {type ==='warning' && <p className="text-yellow-500 ">{message}</p>}
//                     {type ==='error' && <p className="text-red-500 ">{message}</p>}                    
//                 </div> 
//         )}
//     </>   
// )}

// export default Notification;