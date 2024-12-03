import TableScrapeHistory from "../../components/common/ScrapePage/ScrapeHistory/TableScrapeHistory";
import { extractGuid, getAuthToken } from "../../utils/authUtilities";

export default function ScrapeHistoryPage() {
    const userGuid = extractGuid(getAuthToken());

    return (
        <div className='rounded-xl bg-white p-7'>
            <TableScrapeHistory userGuid={userGuid} />
        </div>
    );
}
