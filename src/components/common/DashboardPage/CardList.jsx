import { useEffect, useState } from "react";
import {
    DocumentCheckIcon,
    LinkIcon,
    UsersIcon,
} from "@heroicons/react/24/solid";
import CardListItem from "./CardListItem";
import { useGetCountQuery } from "../../../services/dashboard/dashboardApiSlice";
import Spinner from "../Public/Spinner";

const list = {
    account: {
        bgColor: "bg-[#001F54]",
        icon: <UsersIcon className='h-8 w-8 text-white' aria-hidden='true' />,
        href: "/account",
    },
    site: {
        bgColor: "bg-[#4682B4]",
        icon: <LinkIcon className='h-8 w-8 text-white' aria-hidden='true' />,
        href: "/site",
    },
    request: {
        bgColor: "bg-[#4169E1]",
        icon: (
            <DocumentCheckIcon
                className='h-8 w-8 text-white'
                aria-hidden='true'
            />
        ),
        href: "/request",
    },
};

export default function CardList() {
    const {
        data: dashboardCount,
        isLoading,
        isSuccess,
    } = useGetCountQuery();

    return (
        <>
            {isLoading && <Spinner />}
            {!isLoading && (
                <div className='w-full'>
                    <div className='grid gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8'>
                        <CardListItem
                            {...list["account"]}
                            title='User Account'
                            count={isSuccess ? dashboardCount.data.account : 0}
                        />
                        <CardListItem
                            {...list["site"]}
                            title='Site Source'
                            count={isSuccess ? dashboardCount.data.site : 0}
                        />
                        <CardListItem
                            {...list["request"]}
                            title='Pending Request'
                            count={isSuccess ? dashboardCount.data.request : 0}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
