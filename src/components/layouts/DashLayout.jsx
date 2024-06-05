import { useState } from "react";
import { Header, SidebarDesktop, SidebarMobile, Footer } from "../fragments/index";
import { Outlet } from "react-router-dom";

const DashLayout = () => {
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
                <main className='py-6'>
                    <div className='px-4 sm:px-6 lg:px-8 scroll overflow-y-auto'>
                        {/* Main content */}
                        <Outlet />
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default DashLayout;
