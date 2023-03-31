import clsx from 'clsx';
import React from 'react'
import notificationPreviewCss from './notificationPreview.module.css';

interface notification{
    name: string,
    notification: string
}
const NotificationPreview = ({name, notification}:notification) => {
    return (
        <div className={clsx(notificationPreviewCss.notificationPreviewBox ,'d-flex align-items-center')}>
            <img className={notificationPreviewCss.image} src="images/pfImage.png" alt="" />
                <p className={clsx(notificationPreviewCss.nameAndNot)}>
                    <span className={clsx(notificationPreviewCss.name)}>{name} </span>{notification}
                </p>
        </div>
    )
}

export default NotificationPreview
