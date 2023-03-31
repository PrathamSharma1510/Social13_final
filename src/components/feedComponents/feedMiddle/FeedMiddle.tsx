import React from 'react'
import MembershipAndFeed from '../membershipAndFeed/MembershipAndFeed'
import SelectPost from '../selectPost/SelectPost'
import SinglePost from '../singlePost/SinglePost'

import './feedMiddle.css'

const FeedMiddle = () => {
    return (
        <div className='feedMiddle'>
            {/* <div className="topButtons">
                <MembershipAndFeed/>
            </div> */}
            <div className="whatsTheHype">
                <SelectPost/>
            </div>
            <div className="posts">
                <SinglePost/>
                <SinglePost/>
                <SinglePost/>
            </div>
        </div>
    )
}

export default FeedMiddle
