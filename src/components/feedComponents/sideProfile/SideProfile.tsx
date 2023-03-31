import clsx from 'clsx'
import React from 'react'
import sideProfileCss from './sideProfile.module.css'

const SideProfile = () => {
    return (
        <div className={clsx(sideProfileCss.sideProfile)}>
            <div className={clsx(sideProfileCss.nameImgAndUsername, 'd-flex flex-column align-items-center justify-content-center')}>
                <img className={sideProfileCss.sideProfileImg} src="images/pfIMage.png" alt="" />
                <p className={sideProfileCss.name}>Sandip Rout</p>
                <p className={sideProfileCss.username}>@sandiprout</p>
            </div>

            <div className={sideProfileCss.followersFollowingAndHypes}>
                    <p className={clsx(sideProfileCss.hypes, 'text-center')}> <img src="images/FireSimple.png" className={sideProfileCss.fire} alt="" /> 1,000,573 hypes</p>
            </div>
        </div>
    )
}

export default SideProfile
