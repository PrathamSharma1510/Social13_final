import React from 'react'
import NotificationPreview from './notificationPreview/NotificationPreview'
import NotificationsCss from './notifications.module.css'

const Notifications = () => {
    return (
        <div className={NotificationsCss.notification}>
            <div className="d-flex align-items-center justify-content-between">
                <p className={NotificationsCss.title}>Notifications</p>
                <p className={NotificationsCss.viewMore}>View More <i className="bi bi-arrow-right"></i></p>
            </div>

            <div className="messages">
                <NotificationPreview name='Rahul Kar' notification='hyped your post'/>
                <NotificationPreview name='Raghav Vashisht' notification='commented on your post: “Love the tee!”'/>
                <NotificationPreview name='Pratham Sharma' notification='hyped your post'/>
            </div>
        </div>
    )
}

export default Notifications
