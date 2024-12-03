import { useLocation } from "react-router-dom"
import SelectedScrapeSite from "../../components/common/ScrapePage/WebScraping/SelectedScrapeSite";

export default function ScrapeSitePage() {
    const { state } = useLocation();

    return (
        <div className="rounded-xl bg-white p-7">
            <SelectedScrapeSite siteData={state.item || state.row} />
        </div>
    )
}