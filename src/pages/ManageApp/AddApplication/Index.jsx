import TabApplication from "../TabApplication";
import FormAddApplication from "./FormAddApplication";

export default function AddApplication() {
    return (
        <>
            <div className='flex flex-col items-center'>
                <div className='text-3xl mt-4 font-semibold'>
                    Add Application
                </div>
            </div>
            <TabApplication />
            <FormAddApplication />
        </>
    );
}
