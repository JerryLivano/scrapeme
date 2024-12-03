import { useLocation } from "react-router-dom";
import FormManageTemplate from "../../../components/common/SitePage/TemplatePage/FormManageTemplate";
import GetHTMLTemporary from "../../../components/common/SitePage/TemplatePage/GetHTMLTemporary";

export default function ManageTemplatePage() {
    const { state } = useLocation();

    return (
        <>
            <div className='flex flex-row gap-x-5 sm:flex-row items-start'>
                <div className='rounded-lg bg-white p-6 w-1/2 h-auto max-h-[81vh] overflow-y-auto'>
                    <GetHTMLTemporary />
                </div>
                <div className='rounded-lg bg-white p-6 w-1/2 h-auto max-h-[81vh] overflow-y-auto'>
                    <FormManageTemplate siteGuid={state.siteGuid} />
                </div>
            </div>
        </>
    );
}
