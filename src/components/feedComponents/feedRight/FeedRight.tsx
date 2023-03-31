import React from 'react'
import Notifications from '../notification/Notifications';
import SideProfile from '../sideProfile/SideProfile';
import Suggested from '../suggestedCreater/Suggested';
import feedRight from './feedRight.module.css';

const FeedRight = () => {
    return (
        <div className={feedRight.feedRight}>
            <Notifications/>
            <Suggested/>
        </div>
    )
}

export default FeedRight
