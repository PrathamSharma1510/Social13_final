import React from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import './membershipAndFeed.css'

const MembershipAndFeed = () => {
    const [feedSelected, setFeedSelected] = useState(false);
    const [membershipSelected, setMembershipSelected] = useState(true);


    const feedClick = () => {
        if(!feedSelected){
            setFeedSelected(true);
            setMembershipSelected(false)
        }
    }

    const membershipClick = () => {
        if(!membershipSelected){
            setFeedSelected(false);
            setMembershipSelected(true);
        }
    }

    return (
        <div>
            <Button onClick={feedClick} className={feedSelected ? 'gradientBorder' : 'noBorder'}><span className='btnName'>Feed</span></Button>
            <Button onClick={membershipClick} className={membershipSelected ? 'gradientBorder': 'noBorder'}><span className='btnName'>Membership</span></Button>
        </div>
    )
}

export default MembershipAndFeed
