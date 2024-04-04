import { useState } from "react";
import { Header, SidebarDesktop, SidebarMobile } from "../fragments";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div>
            <SidebarMobile
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <SidebarDesktop />

            <div className='lg:pl-72'>
                <Header setSidebarOpen={setSidebarOpen} />
                <main className='py-10'>
                    <div className='px-4 sm:px-6 lg:px-8'>
                        {/* Main content */}
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
