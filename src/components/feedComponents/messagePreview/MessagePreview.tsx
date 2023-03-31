import clsx from 'clsx'
import React from 'react'
import './messagePreview.css'

interface Msg {
    read: boolean
}

const MessagePreview = ({read}: Msg) => {

    return (
        <div className='messagePreviewBox d-flex align-items-center'>
            <img className='msgimg' src="images/pfImage.png" alt="" />
            <div className='nameAndMessage'>
                <p className={clsx("name", read && 'darkGray' )}>Raghav Vashisht</p>
                <p className={clsx("messagePreview", read && 'lightGray')}>I want to buy Aish macbook pro max....</p>
            </div>
        </div>
    )
}

export default MessagePreview
