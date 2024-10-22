export default function FormAuthTitle({
    title, subtitle
}) {
    return (
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <h2 className='mt-10 text-left text-2xl font-semibold leading-7 tracking-tight text-[#181c32]'>
                {title}
            </h2>
            <h2 className='text-left text-sm font-medium leading-9 tracking-tight text-[#A1A5B7]'>
                {subtitle}
            </h2>
        </div>
    );
}
