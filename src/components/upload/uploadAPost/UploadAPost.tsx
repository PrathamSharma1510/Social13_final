import clsx from 'clsx'
import React from 'react'
import { useDispatch } from 'react-redux'
import { UPLOAD_BUTTON_CLOSE_SUCCESS } from '../../../redux/constants/uploadConst'
import PostButton from '../../postButton/PostButton'
import uploadPostCss from './uploadAPost.module.css'
const UploadAPost = () => {

    const dispatch = useDispatch()

    const closeHandler = () => {
        dispatch ({type: UPLOAD_BUTTON_CLOSE_SUCCESS})
    }
    return (
        <div>
            
        </div>
    )
}

export default UploadAPost
