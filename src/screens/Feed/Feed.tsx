import React from 'react'
import { useSelector } from 'react-redux'
import FeedLeft from '../../components/feedComponents/feedLeft/FeedLeft'
import FeedMiddle from '../../components/feedComponents/feedMiddle/FeedMiddle'
import FeedRight from '../../components/feedComponents/feedRight/FeedRight'
import Header_login from '../../components/header/header_after_login/Header_login'
import Upload from '../../components/upload/Upload'
import { RootStore } from '../../store'
import FeedCss from './feed.module.css'

const Feed = () => {

    const {clicked } = useSelector((state: RootStore) => state.uploadBtn)

    return (
        <div className='position-relative'>
            <Header_login/>
            <div className={FeedCss.feed}>
                <div className="row">
                    <div className="col-md-3">
                        <FeedLeft/>
                    </div>
                    <div className="col-md-6">
                        <FeedMiddle/>
                    </div>
                    <div className="col-md-3">
                        <FeedRight/>
                    </div>
                </div>
            </div>
            <div className ={ !clicked ? FeedCss.hide : ''}>
                <Upload/>
            </div>
        </div>
    )
}

export default Feed
