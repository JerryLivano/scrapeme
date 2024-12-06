import { useLocation } from "react-router-dom";
import TableFavWebData from "../../components/common/ScrapePage/FavoriteScrape/TableFavWebData";

export default function FavScrapedDataPage() {
    const { state } = useLocation();

    return (
        <div className='rounded-xl bg-white p-7'>
            <TableFavWebData
                scrapeGuid={state.scrapeGuid}
                scrapeName={state.scrapeName}
                scrapeDate={state.scrapeDate}
            />
        </div>
    );
}
