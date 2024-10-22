export default function StatusColorRole({ role }) {
    switch (role) {
        case "ROLE_ADMIN":
            return (
                <div className='flex w-24 items-center justify-center rounded-md bg-[#e1f8ff] py-2 text-[#03acca]'>
                    <p className='text-xs font-semibold'>Admin</p>
                </div>
            );
        case "ROLE_USER":
            return (
                <div className='flex w-24 items-center justify-center rounded-md bg-[#FFF8DD] py-2 text-[#F6C000]'>
                    <p className='text-xs font-semibold'>User</p>
                </div>
            );
    }
}
