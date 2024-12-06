import ModalActionForm from "../../Public/Form/ModalActionForm";

export default function FormModalImage({ open, setOpen, imageUrl }) {
    return (
        <ModalActionForm
            open={open}
            setOpen={setOpen}
            titleForm={"Selected Image"}
        >
            <div className='flex justify-center items-center'>
                <div className='w-[30rem] h-auto flex justify-center items-center'>
                    {imageUrl ? (
                        <img src={imageUrl} className='w-full h-auto' />
                    ) : (
                        <div className='text-xl mt-3 font-semibold'>
                            Image Not Found
                        </div>
                    )}
                </div>
            </div>
        </ModalActionForm>
    );
}
