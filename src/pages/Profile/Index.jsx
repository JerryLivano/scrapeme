import React from "react";
import ProfileData from "./ProfileData";

const ProfilePage = () => {
    return (
        <>
            <div className='flex flex-col items-center mb-4'>
                <div className='text-3xl mt-4 font-semibold'>Profile</div>
            </div>
            <div>
                <ProfileData />
            </div>
        </>
    );
};

export default ProfilePage;
