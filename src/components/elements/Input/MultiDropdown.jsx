// import { useState } from "react";

// export function MultiDropdown() {
//     const [isDropdownDisplayed, setisDropdownDisplayed] = useState(false);
//     const [selectedStates, setSelectedStates] = useState<Record<string, boolean>>( 
//         states.reduce((obj, state) => ({ ...obj, [state.abbrevation]: false}), {})
//     );
//     console.log("selectedStates", selectedStates);


//     return (
//         <fieldset>
//             <button 
//             onClick={() => setisDropdownDisplayed((prevState) => !prevState)}>
//                 --Select your states --
//             </button>
//             {isDropdownDisplayed && (
//                 <div className="">
//                     {states.map((state) => (
//                     <> 
//                         <input 
//                         onChange={(e) => setSelectedStates({
//                             [state.abrbrevation] : e.target.checked,
//                         })
//                     }
//                         id={`input-${item.abrbrevation}`} 
//                         type="checkbox" />    
//                         <label htmlFor="">{item.name}</label>
//                     </> 
//                     ))}
//             </div>
//             )}
//         </fieldset>
//     )
// }