import clsx from 'clsx';
import { X } from 'phosphor-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MODAL_CLOSE_SUCCESS, MODAL_OPEN_SUCCESS } from '../../../redux/constants/profileModals';
import { RootStore } from '../../../store';
import GradientBorder from '../../gradientBorderBtn/GradientBorder';
import styles from './accsetting.module.css';
import Modal from './upgradeAccModal/Modal';

const AccSettings = () => {
    const { clicked } = useSelector((state: RootStore) => state.modalOpen)
    const dispatch = useDispatch()

    const upgradeToCreator = () => {
        dispatch ({type: MODAL_OPEN_SUCCESS})
    }


    useEffect(() => {
        if(clicked){
         document.body.style.overflow = 'hidden';
        } 
        else{
         document.body.style.overflow = 'unset';
        }
       }, [clicked])

       const closeModal = () => {
        dispatch ({type: MODAL_CLOSE_SUCCESS})
    }

    return(
         <>
            <div className={styles.mainDiv}>
                <h2 className={styles.title}>Account Settings</h2>
           
                <div className={styles.content}>
                    <div className={styles.switchAccType}>
                        <h3 className={styles.heading}>Switch Account Type</h3>
                        <p className={styles.desc}>Switch to a creator account and unlock new features! You will be able to sell your work as NFTs, Monetize your Content, Unlock special creator gifts and so much more!</p>
                            <div className={styles.upgrade}><GradientBorder onClick={upgradeToCreator} text='Upgrade to Creator Account'/></div> 

                    </div>

                    {/* <div className={styles.findTunes}>
                        <h3 className={styles.headingFine}>Fine Tune Your Interests</h3>
                        <p className={styles.desc}>Interests can be changed to show user’s genre’s of interest in Explore.</p>
                        <div className={styles.interests}>
                            <button className={clsx('d-inline', styles.interest)}><X size={20} weight='bold' /> &#128514; Comedy</button>
                            <button className={clsx('d-inline', styles.interest)}><X size={20} weight='bold' /> &#127909; YouTube</button>
                            <button className={clsx('d-inline', styles.interest)}><X size={20} weight='bold' /> &#127918; Gaming</button>
                            <button className={clsx('d-inline', styles.interest)}><X size={20} weight='bold' /> &#128132; Beauty</button>
                            <button className={clsx('d-inline', styles.interest)}><X size={20} weight='bold' /> &#128187; Technology</button>
                        </div>
                        <div className={styles.upgrade}><GradientBorder text='Reset Interests'/></div> 


                    </div> */}

                    <div className={styles.NSFW}>
                        <h3 className={styles.heading}>NSFW Content</h3>
                        <p className={styles.desc}>Is your content only suitable for viewers above the age of 18?
                        <br />
                        <br />
                        Help us make HyprClub a safe space for users of all ages by flagging your account as NSFW. If you fail to flag your account and get reported by a user, HyprClub has full rights to suspend your account. </p>
                        <div className={clsx('d-flex align-items-center')}>
                            <input className={styles.checkboxInput} id="terms" name='terms' type="checkbox" />
                            <label className={clsx('ms-2', styles.checkbox)} htmlFor="terms">Flag my content as NSFW</label>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={closeModal} className={clsx(styles.modalDiv, clicked? styles.show: styles.hide)}>
                <Modal/>
            </div>
         </>
    )
}

export default AccSettings