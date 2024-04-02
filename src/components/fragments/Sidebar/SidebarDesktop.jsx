import SidebarComponent from "./SidebarComponent";

const SidebarDesktop = () => {
    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <SidebarComponent />
        </div>
    );
};

export default SidebarDesktop;
