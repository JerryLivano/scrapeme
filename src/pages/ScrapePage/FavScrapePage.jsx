import TableFavScrape from "../../components/common/ScrapePage/FavoriteScrape/TableFavScrape";
import { extractGuid, getAuthToken } from "../../utils/authUtilities";

export default function FavScrapePage(){
    const userGuid = extractGuid(getAuthToken());

    return (
        <div className='rounded-xl bg-white p-7'>
            <TableFavScrape userGuid={userGuid} />
        </div>
    );
}