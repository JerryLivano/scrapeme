import LogoScrapeMe from "./LogoScrapeMe";
import NavItems from "./NavItems";

export default function SidebarContent() {
    return (
        <div className='flex grow flex-col gap-y-8 overflow-y-auto bg-[#F1F1F2] px-8 py-4'>
            <LogoScrapeMe />
            <NavItems />
        </div>
    );
}
