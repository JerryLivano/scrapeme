import { LogoSidebar } from "../../../assets/imageList";

export default function LogoScrapeMe() {
    return (
        <div className='flex h-16 shrink-0 items-center'>
            <img
                className='w-200 h-auto'
                src={LogoSidebar}
                alt='Logo Scrape-ME'
            />
        </div>
    );
}
