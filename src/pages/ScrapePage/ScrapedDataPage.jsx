import { useLocation } from "react-router-dom";
import TableWebData from "../../components/common/ScrapePage/ScrapeHistory/TableWebData";

export default function ScrapedDataPage() {
    const { state } = useLocation();

    return (
        <div className='rounded-xl bg-white p-7'>
            <TableWebData
                scrapeGuid={state.scrapeGuid}
                scrapeName={state.scrapeName}
                scrapeDate={state.scrapeDate}
            />
        </div>
    );
}
