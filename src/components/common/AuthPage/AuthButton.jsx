export default function AuthButton({
    text
}) {
    return (
        <button
            type='submit'
            className='mt-12 flex w-full justify-center rounded-md bg-[#0D5CC6] px-3 py-3 text-sm font-medium leading-6 text-white shadow-sm hover:bg-[#3d7cd1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d7cd1]'
        >
            {text}
        </button>
    );
}
