import React from 'react'
import { useState } from 'react'
import MessagePreview from '../messagePreview/MessagePreview'
import './messages.css'

const FeedRight = () => {
    const [read, setRead] = useState(false)
    const [unread, setUnread] = useState(true)

    const unreadClicked = () => {
        setRead(false)
        setUnread(true)
    }

    const readClicked = () => {
        setRead(true)
        setUnread(false)
    }
    return (
        <div className='feedRight'>
            <div className="d-flex align-items-center justify-content-between">
                <p className="title">Messages</p>
                <p className="viewMore">View More <i className="bi bi-arrow-right"></i></p>
            </div>

            <div className="readAndUnread">
                <p><span onClick={unreadClicked} className={unread ? 'underline':''}>Unread</span><span onClick={readClicked} className={read ? 'underline':''}>Read</span></p>
            </div>

            <div className="messages">
                <MessagePreview read={false}/>
                <MessagePreview read/>
                <MessagePreview read/>
                <MessagePreview read= {false}/>
            </div>
        </div>
    )
}

export default FeedRight
