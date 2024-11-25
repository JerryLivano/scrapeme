import Spinner from "../../components/common/Public/Spinner";
import TableRequestAdmin from "../../components/common/SiteRequestPage/TableRequestAdmin";
import TableRequestUser from "../../components/common/SiteRequestPage/TableRequestUser";
import { extractGuid, extractRole, getAuthToken } from "../../utils/authUtilities";

export default function SiteRequestPage() {
    const token = getAuthToken();
    const role = extractRole(token);
    const guid = extractGuid(token);

    return (
        <>
            {!role && <Spinner />}
            {role && (
                <div className='rounded-xl bg-white p-7'>
                    {role === "ROLE_ADMIN" ? (
                        <TableRequestAdmin />
                    ) : (
                        <TableRequestUser userGuid={guid} />
                    )}
                </div>
            )}
        </>
    );
}
