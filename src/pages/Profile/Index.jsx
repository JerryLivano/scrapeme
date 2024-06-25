import React from "react";
import ProfileData from "./ProfileData";
import { extractId, getAuthToken } from "../../utils/authUtilities";

const ProfilePage = () => {
    const accountId = extractId(getAuthToken());
    return (
        <>
            <div className='flex flex-col items-center mb-4'>
                <div className='text-3xl mt-4 font-semibold'>Profile</div>
            </div>
            <div>
                <ProfileData
                    userId={accountId}
                />
            </div>
        </>
    );
};

export default ProfilePage;
