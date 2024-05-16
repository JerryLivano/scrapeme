import { Link } from "react-router-dom";
import {
    LogoBRMDashboard,
    LogoCVMeDashboard,
    LogoMADashboard,
    LogoPickMeDashboard,
    LogoRecruitMeDashboard,
    LogoTeamMeDashboard,
    LogoTestMeDashboard,
} from "../../assets/imageList";

const app = [
    {
        name: "Recruit-ME",
        bgcolor: "bg-slate-300",
        href: "https://www.metrodataacademy.id/",
        imageUrl: LogoRecruitMeDashboard,
    },
    {
        name: "CV-ME",
        bgcolor: "bg-slate-300",
        href: "https://www.metrodataacademy.id/",
        imageUrl: LogoCVMeDashboard,
    },
    {
        name: "Test-ME",
        bgcolor: "bg-slate-300",
        href: "https://www.metrodataacademy.id/",
        imageUrl: LogoTestMeDashboard,
    },
    {
        name: "Pick-ME",
        bgcolor: "bg-slate-300",
        href: "https://www.metrodataacademy.id/",
        imageUrl: LogoPickMeDashboard,
    },
    {
        name: "Team-ME",
        bgcolor: "bg-slate-300",
        href: "https://www.metrodataacademy.id/",
        imageUrl: LogoTeamMeDashboard,
    },
    {
        name: "BRM",
        bgcolor: "bg-slate-300",
        href: "https://www.metrodataacademy.id/",
        imageUrl: LogoBRMDashboard,
    },
    {
        name: "Metrodata Academy",
        bgcolor: "bg-slate-300",
        href: "https://www.metrodataacademy.id/",
        imageUrl: LogoMADashboard,
    },
];

const AppListItem = () => {
    return (
        <ul
            role='list'
            className='grid grid-cols-1 gap-6 max-w-4xl overflow-hidden sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        >
            {app.map((apps) => (
                <Link
                    to={apps.href}
                    className='hover:opacity-90'
                    title={apps.name}
                    key={apps.name}
                >
                    <li className='col-span-1 flex flex-col divide-y divide-gray-200 rounded-2xl h-48 bg-slate-200 hover:bg-slate-400 text-center shadow'>
                        <div className='flex flex-1 flex-col justify-center items-center p-8'>
                            <img
                                className='h-20 w-22 mb-4'
                                src={apps.imageUrl}
                                alt={apps.name}
                            />
                            <div className='font-medium text-blue-800'>
                                {apps.name}
                            </div>
                        </div>
                    </li>
                </Link>
            ))}
        </ul>
    );
};

export default AppListItem;
