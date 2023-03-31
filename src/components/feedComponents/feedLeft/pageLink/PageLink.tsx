import React from 'react'
import './pageLink.css'

interface Link {
    text: string,
    icon: string
}

const PageLink = ({ text, icon}: Link) => {
    return (
        <div className='pageLink align-items-center'>
            <p><i className={icon}></i>{text}</p>
        </div>
    )
}

export default PageLink
