import { Link } from "react-router-dom"
import {logoMA, LogoBRM, LogoCVMe, LogoPickMe, LogoRecruitMe, LogoTeamMe, LogoTestMe} from "../../assets"


const app = [
    {
        name : 'RecruitMe',
        bgcolor: "bg-slate-300",
        href:"https://www.metrodataacademy.id/",
        imageUrl: LogoRecruitMe,
    },
    {
        name : 'CVMe',
        bgcolor: "bg-slate-300",
        href:"https://www.metrodataacademy.id/",
        imageUrl: LogoCVMe,
    },
    {
        name : 'TestMe',
        bgcolor: "bg-slate-300",
        href:"https://www.metrodataacademy.id/",
        imageUrl: LogoTestMe,
    },
    {
        name : 'PickMe',
        bgcolor: "bg-slate-300",
        href:"https://www.metrodataacademy.id/",
        imageUrl: LogoPickMe,
    },
    {
        name : 'TeamMe',
        bgcolor: "bg-slate-300",
        href:"https://www.metrodataacademy.id/",
        imageUrl: LogoTeamMe,
    },
    {
        name : 'BRM',
        bgcolor: "bg-slate-300",
        href:"https://www.metrodataacademy.id/",
        imageUrl: LogoBRM,
    },
    {
        name : 'METRODATA ACADEMY',
        bgcolor: "bg-slate-300",
        href:"https://www.metrodataacademy.id/",
        imageUrl: logoMA,
    },
]

const AppListItem = () => {
    return (
        <ul role="list" className="grid grid-cols-1 gap-6 max-w-4xl overflow-hidden sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {app.map((apps) => (
                <Link to={'add-user'} className="hover:opacity-90" title={apps.name}>
                <li
                key={apps.name}
                className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-2xl h-48 bg-slate-200 hover:bg-slate-400 text-center shadow">
                    <div className="flex flex-1 px-8 mx-2 flex-col p-8" >
                        <img className="mx-auto h-20 w-22 left-shrink-0" src={apps.imageUrl} alt="" />
                        <h3 className="mt-6 text-md font-medium text-blue-800">{apps.name}</h3>
                    </div>
                </li>
                </Link>
            ))}
        </ul>
        

    )
}

export default AppListItem
