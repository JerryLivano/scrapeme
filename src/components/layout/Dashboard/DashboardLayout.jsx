import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBarMobile from "../Sidebar/SidebarMobile";
import SidebarDesktop from "../Sidebar/SidebarDesktop";
import HeaderPage from "../Header/HeaderPage";

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();
    const pathnameTitle = pathname.split("/")[1];

    let title;
    switch (pathnameTitle) {
        case "dashboard":
            title = "Dashboard";
            break;
        case "scrape":
            title = "Scrape";
            break;
        case "site":
            title = "Site";
            break;
        case "category":
            title = "Category";
            break;
        case "account":
            title = "User Account";
            break;
        default:
            title = "";
    }

    return (
        <div>
            {/* Mobile Sidebar */}
            <SideBarMobile
                sidebarOpen={sidebarOpen}
                setSidebarOpen={() => setSidebarOpen(false)}
            />
            {/* Desktop Sidebar */}
            <SidebarDesktop />
            <div className='lg:pl-64'>
                <HeaderPage
                    title={title}
                    setSidebarOpen={() => setSidebarOpen(true)}
                />
                <div className='px-4 pt-6 sm:px-6 lg:px-8'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
