import clsx from 'clsx'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPLOAD_BUTTON_CLOSE_SUCCESS } from '../../redux/constants/uploadConst'
import { RootStore } from '../../store'
import PostButton from '../postButton/PostButton'
import upload from './upload.module.css'
import UploadAPost from './uploadAPost/UploadAPost'
import UploadType from './upLoadTypes/UploadType'
import uploadPostCss from './uploadAPost/uploadAPost.module.css'


const Upload = () => {

    const [showUploadAPost, setShowUploadAPost] = useState(false)
    const { clicked } = useSelector((state: RootStore) => state.uploadBtn)

    const dispatch = useDispatch()

    const closeHandler = () => {
        dispatch ({type: UPLOAD_BUTTON_CLOSE_SUCCESS})
    }

    const closeHandler2 = () => {
        dispatch ({type: UPLOAD_BUTTON_CLOSE_SUCCESS})
        setShowUploadAPost(false)
    }

    return (
        <div className={clsx(upload.uploadDiv, 'd-flex justify-content-center align-items-center position-fixed', upload.hide)}>
            <div className={clsx(upload.upload, (showUploadAPost && clicked) && upload.hide)}>
                <div className={clsx(upload.uploadHeading, 'd-flex justify-content-between align-items-center')}>
                    <p className={upload.heading}>Upload</p>
                    <i onClick={closeHandler} className={clsx(upload.icon, "bi bi-x")}></i>
                </div>
                <div>
                    <div onClick={() => setShowUploadAPost(true)} className={upload.firstType}>
                        <UploadType icon='bi bi-box-arrow-in-up'/>
                    </div>
                    <div className={upload.secondType}>
                        <UploadType icon='bi bi-people-fill'/>
                    </div>
                    <div className={upload.thirdType}>
                        <UploadType icon='bi bi-currency-dollar'/>
                    </div>
                </div>
            </div>

            {
                (showUploadAPost && clicked) && 
                <div className={uploadPostCss.uploadAPost}>
                <div className={clsx(uploadPostCss.uploadHeading, 'd-flex justify-content-between align-items-center')}>
                    <p className={uploadPostCss.heading}>Upload a Post</p>
                    <i onClick={closeHandler2} className={clsx(uploadPostCss.icon, "bi bi-x")}></i>
                </div>


                <div className={uploadPostCss.inputAndPostBtn}>
                    <input type="text" className={clsx(uploadPostCss.inputText, "form-control")} placeholder="What’s the hype?" aria-label="Username" aria-describedby="basic-addon1"/>
                    <div className='icons d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <i className={clsx("bi bi-image-fill", uploadPostCss.inputicon)}></i>
                                <img className={uploadPostCss.inputicon} src="images/GIFIcon.png" alt="" />
                                <i className={clsx("bi bi-link-45deg", uploadPostCss.inputicon)}></i>
                                <i className={clsx("bi bi-calendar-check", uploadPostCss.inputicon)}></i>
                            </div>
                            <div className='d-flex align-items-center'>
                                <PostButton btnText='Post' small={false}/>
                            </div>
                        </div>
                </div>
            </div>
            }

        </div>
    )
}

export default Upload
