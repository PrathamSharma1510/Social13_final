import clsx from 'clsx'
import React from 'react'
import uploadTypeCss from './uploadType.module.css'


interface Upload{
    icon: string
}



const uploadType = ({icon}:Upload) => {

    
    return (
        <div className={clsx(uploadTypeCss.uploadType, 'd-flex')}>
            <i className={clsx(uploadTypeCss.icon, icon)}></i>
            <div>
                <p className={uploadTypeCss.title}>Upload a post to your feed</p>
                <p className={uploadTypeCss.desc}>Share a photos, videos, gifs or just an update about your life with your followers!</p>
            </div>
        </div>
    )
}

export default uploadType
