import React from 'react'   
import Follow from '../followBtn/Follow'
import './creater.css'

interface creater{
    imageUrl: any,
    name: string
    username: string
    bio: string

}

const Creater = ({imageUrl, name, username, bio}: creater) => {
    return (
        <div>
            <div className="creater d-flex mb-5">
                <div className="createrImgDiv">
                    <img className='createrImg' src={imageUrl} alt={name} />
                </div>
                <div className="nameUserNameBioAndFollowBtn  position-relative d-flex flex-column">
                    <div className="nameUserNameFollow d-flex align-items-center">
                        <div className='me-3'>
                            <h3 className="name">{name}</h3>
                            <p className='username'>@{username}</p>
                        </div>
                        <div className='followbtnPlacement position-absolute'>
                            <Follow/>
                        </div>
                    </div>
                    <div className="bio">
                        <p>{bio}</p>
                        <div className="followBottom">
                            <Follow/>
                        </div>
                    </div>
                </div>
                </div>
            </div>
    )
}

export default Creater
