import { useState } from 'react';
import { Header, SidebarDesktop, SidebarMobile } from '../fragments';

export default function DashboardLayout(props) {
    const { children } = { ...props };
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div>
            <SidebarMobile
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <SidebarDesktop />
            <div className="lg:pl-72">
                <Header setSidebarOpen={setSidebarOpen} />
                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {/* Main content */}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
