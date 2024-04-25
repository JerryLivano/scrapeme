import { Link } from "react-router-dom"
import {logoMA, LogoBRM, LogoCVMe, LogoPickMe, LogoRecruitMe, LogoTeamMe, LogoTestMe} from "../../assets"
import { useState } from "react"


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
        name : 'MA',
        bgcolor: "bg-slate-300",
        href:"https://www.metrodataacademy.id/",
        imageUrl: logoMA,
    },
]

const AppListItem = () => {
    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            
            {app.map((apps) => (
                <Link to={apps.href} className="hover:opacity-90" title={apps.name}>
                <li
                key={apps.name}
                className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-2xl bg-slate-200 hover:bg-slate-400 text-center shadow"
                >
                    <div className="flex flex-1 px-8 mx-2 flex-col p-8" 
                    >
                    <img className="mx-auto h-20 w-28 left-shrink-0" src={apps.imageUrl} alt="" />
                    <h3 className="mt-6 text-lg font-medium text-blue-800">{apps.name}</h3>
                    {/* <dl className="mt-1 flex flex-grow flex-col justify-between">
                    <dt className="sr-only">Title</dt>
                    <dd className="text-sm text-gray-500">{person.title}</dd>
                    <dt className="sr-only">Role</dt>
                    <dd className="mt-3">
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {person.role}
                        </span>
                    </dd>
                    </dl> */}
                    </div>
                </li>
                </Link>
            ))}
        </ul>

    )
}

export default AppListItem
