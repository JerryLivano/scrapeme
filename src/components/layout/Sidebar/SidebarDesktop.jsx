import SidebarContent from "./SidebarContent";

export default function SidebarDesktop() {
    return (
        <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col'>
            <SidebarContent />
        </div>
    );
}
