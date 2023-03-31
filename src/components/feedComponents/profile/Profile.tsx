import clsx from 'clsx'
import React from 'react'
import Follow from '../../followBtn/Follow'
import profileCss from './profile.module.css'

interface ProfileI{
    bb: boolean
}
const Profile = ({bb}: ProfileI) => {
    return (
        <div className={clsx(profileCss.profile, 'd-flex align-items-center', bb && profileCss.bb)}>
                <img className={profileCss.profilePic} src="images/koreanImg.png" alt="" />
                <div className={clsx(profileCss.nameUsernameAndBio)}>
                    <p className={profileCss.name}>Urvashi Goyal</p>
                    <p className={profileCss.username}>@hansohee</p>
                    <p className={profileCss.bio}>I own Go(YAL) Air.</p>
                </div>
                <div className={clsx(profileCss.button, 'd-flex justify-content-end')}>
                    <Follow />
                </div>
        </div>
    )
}

export default Profile
