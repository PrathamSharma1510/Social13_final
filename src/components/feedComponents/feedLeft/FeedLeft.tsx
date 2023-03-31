import React from 'react'
import { useState } from 'react'
import ButtonBorderSolid from '../buttonBorderSolid/ButtonBorderSolid'
import SideProfile from '../sideProfile/SideProfile'
import "./feedLeft.css"
import PageLink from './pageLink/PageLink'
import PageLinks from './pageLinks/PageLinks'

const FeedLeft = () => {
    
    return (
        <div className=''>
            <PageLinks/>
            <SideProfile/>
        </div>
    )
}

export default FeedLeft
