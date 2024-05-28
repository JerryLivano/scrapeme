import { useGetApplicationQuery } from "../../services/applicationApiSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SingleLineInput from "../../components/elements/Input/SIngleLineInput";
import DropdownInput from "../../components/elements/Input/DropdownInput";


const ManageApp = () => {

  const [page, setPage] = useState(1);
  const {
    data: applications,
    isLoading: applicationIsLoading,
    isError: applicationIsError,
  } = useGetApplicationQuery({ page: page, limit: 100 });
  
  let filterAppOptions = [];
  const [selectedApp, setSelectedApp] = useState(null);
  const { handleSubmit: handleSubmitOpenModal } = useForm({});
  console.log(selectedApp);

      if (!applicationIsLoading && !applicationIsError && applications.data) {
          filterAppOptions = applications.data.map((app) => ({
              id: app.id,
              name: app.name,
          }));
      }

      const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
        reset,
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            id: "",
            email: "",
            firstName: "",
            lastName: "",
            nik: "",
            roleId: "",
            roleName: "",
            authorizedApplications: [],
        },
        mode: "onChange",
    });



  return (
    <>
    <div className='flex flex-col items-center mb-20'>
        <div className='text-3xl mt-4 font-semibold'>Manage Application</div>
    </div>
    <div className="px-12">
      <div className="text-xl text-black my-6 font-semibold">
        Application
      </div>
      <div className="w-full gap-x-8 inline-flex border-b mb-20 border-slate-300">
        {filterAppOptions.map((app) => (
            <button
            key={app.id}
            className={`border-b border-white inline-flex text-lg pb-5 hover:text-blue-700 hover:border-b-blue-700 h-fit ${
              selectedApp === app.id ? "border-b-blue-700 text-blue-700" : ""
            }`}
            onClick={() => setSelectedApp(app.id)}
          >
            {app.name}
          </button>
          ))}
      </div>
      <div className='border border-gray-300 rounded-md px-8 py-6'>
        <form
            className='flex grow basis-2/3 flex-col gap-4'
            // onSubmit={handleSubmitOpenModal(() =>
            //     setShowAddTemp(true)
            // )}
        >
            <table className='w-full'>
                <tr className='border-b-2'>
                    <td className='font-semibold text-lg px-8'>
                        <label htmlFor='email'>Application Name</label>
                    </td>
                    <td className={"w-80 flex py-4"}>
                        <SingleLineInput
                            className='w-full'
                        />
                    </td>
                </tr>
                <tr className='border-b-2'>
                    <td className='font-semibold text-lg px-8'>
                        <label htmlFor='first-name'>
                            URL
                        </label>
                    </td>
                    <td className='w-80 flex py-4'>
                        <SingleLineInput
                            className='w-full'
                        />
                    </td>
                </tr>
                <tr className='border-b-2'>
                    <td className='font-semibold text-lg px-8'>
                        <label htmlFor='last-name'>
                          Logo
                        </label>
                    </td>
                    <td className='w-80 flex py-4'>
                        <SingleLineInput
                            className='w-full'
                        />
                    </td>
                </tr>
                <tr className='border-b-2'>
                    <td className='font-semibold text-lg px-8'>
                        <label htmlFor='nik'>Status</label>
                    </td>
                    <td className='w-80 flex py-4'>
                        <DropdownInput 
                        // placeholder={value}
                        // value
                        />
                    </td>
                </tr>
            </table>
        </form>
      </div>
    </div>

    </>
  )
}

export default ManageApp
