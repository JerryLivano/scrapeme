import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function InputPassword() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className='relative mt-2 rounded-md shadow-sm'>
            <input
                id='password'
                name='password'
                placeholder='Password'
                type={showPassword ? "text" : "password"}
                className='block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
            <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeIcon
                            className='w-5 h-5 text-gray-400'
                            aria-hidden='true'
                        />
                    ) : (
                        <EyeSlashIcon
                            className='w-5 h-5 text-gray-400'
                            aria-hidden='true'
                        />
                    )}
                </button>
            </div>
        </div>
    );
}

// import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

// export default function Example() {
//   return (
//     <div>
//       <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
//         Email
//       </label>
//       <div className="relative mt-2 rounded-md shadow-sm">
//         <input
//           type="email"
//           name="email"
//           id="email"
//           className="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
//           placeholder="you@example.com"
//           defaultValue="adamwathan"
//           aria-invalid="true"
//           aria-describedby="email-error"
//         />
//         <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//           <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
//         </div>
//       </div>
//       <p className="mt-2 text-sm text-red-600" id="email-error">
//         Not a valid email address.
//       </p>
//     </div>
//   )
// }
