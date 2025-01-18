import { UsersIcon } from "@heroicons/react/24/solid";
import AvgCardListItem from "./AvgCardListItem";
import { pluralize } from "../../../../utils/pluralizeUtilities";

const list = {
    bedroom: {
        color: "bg-[#01082D]",
        icon: <UsersIcon className='h-7 w-7 text-white' aria-hidden='true' />,
        labelIcon: "Bedroom",
    },
    bathroom: {
        color: "bg-[#041D56]",
        icon: <UsersIcon className='h-7 w-7 text-white' aria-hidden='true' />,
        labelIcon: "Bathroom",
    },
    surface: {
        color: "bg-[#0F2573]",
        icon: <UsersIcon className='h-7 w-7 text-white' aria-hidden='true' />,
        labelIcon: "Surface Area",
    },
    building: {
        color: "bg-[#266CA9]",
        icon: <UsersIcon className='h-7 w-7 text-white' aria-hidden='true' />,
        labelIcon: "Building Area",
    },
};

export default function AvgCardList({ avgData }) {
    return (
        <div className='w-full'>
            <div className='grid gap-x-6 gap-y-8 lg:grid-cols-4 xl:gap-x-4'>
                <AvgCardListItem
                    {...list["bedroom"]}
                    title={avgData.avg_bedroom ? pluralize(avgData.avg_bedroom, "Room", { onlyNoun: true }) : ""}
                    count={avgData.avg_bedroom ? avgData.avg_bedroom : "-"}
                />
                <AvgCardListItem
                    {...list["bathroom"]}
                    title={avgData.avg_bathroom ? pluralize(avgData.avg_bathroom, "Room", { onlyNoun: true }) : ""}
                    count={avgData.avg_bathroom ? avgData.avg_bathroom : "-"}
                />
                <AvgCardListItem
                    {...list["surface"]}
                    title={avgData.avg_surface ? "m²" : ""}
                    count={avgData.avg_surface ? avgData.avg_surface : "-"}
                />
                <AvgCardListItem
                    {...list["building"]}
                    title={avgData.avg_building ? "m²" : ""}
                    count={avgData.avg_building ? avgData.avg_building : "-"}
                />
            </div>
        </div>
    );
}
