import React from "react";
import ProfileData from "./ProfileData";

const ProfilePage = ({accountId}) => {
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
