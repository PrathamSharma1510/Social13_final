/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import Continue from '../../components/continueBtn/Continue'
import Creater from '../../components/followPerson/Creater'
import Logo from '../../components/logo/Logo'
import './followCreater.css'

const FollowCreator = () => {
    return (
        <div>
          <Logo/>
            <div className="container followCreater">
                <div className='d-flex justify-content-center'>
                    <div className="followCreatersCard">
                            <Link to="#">
                                <i className="bi arrowLeft bi-arrow-left"></i>
                            </Link>
                        <h1 className="followHeader">Follow <span className='partOfHeader'> Some Creators </span></h1>
                        <p className='followSubtitle'>Build your feed by following some of the top creators of your favorite genres.</p>
                            <div className='mb-3'>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Creater name='Anubhav Singh Bassi' username='belikebassi' bio='Bassi ki kuchh cool si bio. Ishika is talking on the phone.' imageUrl='images/bassi.png'/>
                                    </div>
                                    <div className="col-md-6">
                                        <Creater name='Anubhav Singh Bassi' username='belikebassi' bio='Bassi ki kuchh cool si bio. Ishika is talking on the phone.' imageUrl='images/bassi.png'/>
                                    </div>
                                    <div className="col-md-6">
                                        <Creater name='Anubhav Singh Bassi' username='belikebassi' bio='Bassi ki kuchh cool si bio. Ishika is talking on the phone.' imageUrl='images/bassi.png'/>
                                    </div>
                                    <div className="col-md-6">
                                        <Creater name='Anubhav Singh Bassi' username='belikebassi' bio='Bassi ki kuchh cool si bio. Ishika is talking on the phone.' imageUrl='images/bassi.png'/>
                                    </div>
                                    <div className="col-md-6">
                                        <Creater name='Anubhav Singh Bassi' username='belikebassi' bio='Bassi ki kuchh cool si bio. Ishika is talking on the phone.' imageUrl='images/bassi.png'/>
                                    </div>
                                    <div className="col-md-6">
                                        <Creater name='Anubhav Singh Bassi' username='belikebassi' bio='Bassi ki kuchh cool si bio. Ishika is talking on the phone.' imageUrl='images/bassi.png'/>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <Continue/>
                                </div>
                                <p className='skip'> <a className='link' href="#">Skip</a></p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FollowCreator
