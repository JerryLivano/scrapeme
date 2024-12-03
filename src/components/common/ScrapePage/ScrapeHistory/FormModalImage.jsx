import ModalActionForm from "../../Public/Form/ModalActionForm";

export default function FormModalImage({ open, setOpen, imageUrl }) {
    return (
        <ModalActionForm
            open={open}
            setOpen={setOpen}
            titleForm={"Selected Image"}
        >
            <div className='w-full h-auto items-center justify-center flex'>
                {imageUrl ? (
                    <img src={imageUrl}  />
                ) : (
                    <div className='text-xl mt-3 font-semibold'>
                        Image Not Found
                    </div>
                )}
            </div>
        </ModalActionForm>
    );
}
