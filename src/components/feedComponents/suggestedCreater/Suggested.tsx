import React from 'react'
import Profile from '../profile/Profile'
import suggestedCss from './suggested.module.css'

const Suggested = () => {
    return (
        <div className={suggestedCss.suggested}>
            <div className={suggestedCss.titleAndSubtitle}>
                <p className={suggestedCss.title}>Suggested Creators</p>
                <p className={suggestedCss.subtitle}>From your favorite genre, <span className={suggestedCss.genre}> Art.</span></p>
            </div>
            <div className={suggestedCss.profiles}>
                <Profile bb/>
                <Profile bb/>
                <Profile bb={false}/>
            </div>
        </div>
    )
}

export default Suggested
