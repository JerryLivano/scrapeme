import { useEffect, useState } from "react";
import {
    BookmarkIcon,
    LinkIcon,
    PencilSquareIcon,
    UsersIcon,
} from "@heroicons/react/24/solid";
import CardListItem from "./CardListItem";

const list = {
    account: {
        bgColor: "bg-[#001F54]",
        icon: <UsersIcon className='h-6 w-6 text-white' aria-hidden='true' />,
        href: "/account",
    },
    site: {
        bgColor: "bg-[#4682B4]",
        icon: <LinkIcon className='h-6 w-6 text-white' aria-hidden='true' />,
        href: "/site",
    },
    template: {
        bgColor: "bg-[#4169E1]",
        icon: <PencilSquareIcon className='h-6 w-6 text-white' aria-hidden='true' />,
        href: "/scrape/template",
    },
    history: {
        bgColor: "bg-[#6A5ACD]",
        icon: <BookmarkIcon className='h-6 w-6 text-white' aria-hidden='true' />,
        href: "/scrape/history",
    },
};

export default function CardList() {
    const [siteCount, setSiteCount] = useState(0);
    const [templateCount, setTemplateCount] = useState(0);
    const [historyCount, setHistoryCount] = useState(0);
    const [accountCount, setAccountCount] = useState(0);

    //   const { data: cardInfo } = useGetCardInfoQuery();

    //   useEffect(() => {
    //     if (cardInfo) {
    //       setEmployeeCount(cardInfo?.data[0]?.totalEmployee);
    //       setClassCount(cardInfo?.data[0]?.totalBatchClass);
    //       setInterviewCount(cardInfo?.data[0]?.totalInterview);
    //       setPlacementCount(cardInfo?.data[0]?.totalPlacement);
    //     }
    //   }, [cardInfo]);

    return (
        <div>
            <ul
                role='list'
                className='grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-4 xl:gap-x-8'
            >
                <CardListItem
                    {...list["account"]}
                    title='User Account'
                    count={accountCount}
                />
                <CardListItem
                    {...list["site"]}
                    title='Site Source'
                    count={siteCount}
                />
                <CardListItem
                    {...list["template"]}
                    title='Scrape Template'
                    count={templateCount}
                />
                <CardListItem
                    {...list["history"]}
                    title='Scrape History'
                    count={historyCount}
                />
            </ul>
        </div>
    );
}
