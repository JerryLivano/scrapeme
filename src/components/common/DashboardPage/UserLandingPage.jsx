import { Carousel } from "@material-tailwind/react";
import { DashboardContent, LogoSidebar } from "../../../assets/imageList";
import ButtonAction from "../Public/Button/ButtonAction";
import { useNavigate } from "react-router-dom";

export default function UserLandingPage() {
    const navigate = useNavigate();

    return (
        <div className='flex flex-row gap-x-12 px-12 items-center justify-around w-full h-[75vh]'>
            <div className='w-1/2 h-full flex flex-col items-start justify-center'>
                <div className='mb-4'>
                    <img
                        className='w-40 h-auto'
                        src={LogoSidebar}
                        alt='Logo Scrape-ME'
                    />
                </div>
                <div className='mb-4 text-5xl font-semibold tracking-[0.015em] leading-[1.15] text-gray-800'>
                    Scrape Real-Estate Web Data{" "}
                    <span className='text-[#17479D]'>More Easily</span>
                </div>
                <div className='mb-5'>
                    <p className='text-lg text-gray-800 text-justify'>
                        Scrape-ME is a web scraping tools that helps you to
                        scrape web data from any real-estate e-Commerce website.
                        It is a useful tools for anyone who wants to scrape data
                        from a real-estate e-Commerce website.
                    </p>
                </div>
                <ButtonAction
                    onClick={() => navigate("/scrape", { replace: true })}
                    colorClass={"bg-[#17479D]"}
                    hoverClass={"bg-blue-600"}
                    text={"Scrape It Now"}
                />
            </div>
            <div className='w-1/2 h-full flex flex-col items-center justify-center'>
                <img
                    className='w-11/12 h-auto'
                    src={DashboardContent}
                    alt='Landing Page Content'
                />
            </div>
        </div>
    );
}
