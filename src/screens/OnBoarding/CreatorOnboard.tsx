import clsx from 'clsx';
import React from 'react';
import GradientBorder from '../../components/gradientBorderBtn/GradientBorder';
import Header_login from '../../components/header/header_after_login/Header_login';
import styles from './styles.module.css'
const CreatorOnboard = () => {
  return <>
        <Header_login/>


        <div className={clsx( styles.mainDiv)}> 
            <div className={clsx(styles.topSection, 'row')}>
                <div className={clsx("col-md-6", styles.textMain)}>
                    <h2 className={styles.creatorNFTS}><span className={styles.gradientText}>Creator NFTs</span> are here</h2>
                    <p className={styles.textDesc}>Getting into NFTs is now easier than ever!</p>
                    <GradientBorder className='mt-4' text='Get Started'/>
                </div>
                <div className={clsx("col-md-6", styles.imgDiv)}>
                    <img className={styles.pfIMg} src="images/onBoard/pf2.png" alt="" />
                </div>
            </div> 
            <div className={styles.brandsSection}>
                <p>Mentored & Trusrted By</p>
                <div className={clsx('d-flex justify-content-around align-items-center', styles.imgDiv)}>
                    <div><img src="images/onBoard/bennett.png" alt="" /></div>
                    <div><img src="images/onBoard/bennett2.png" alt="" /></div>
                    <div><img src="images/onBoard/timesPrime.png" alt="" /></div>
                    <div><img src="images/onBoard/oriel.png" alt="" /></div>
                    <div><img src="images/onBoard/koo.png" alt="" /></div>
                </div>

                <div className='d-flex justify-content-center'>
                    <div className={styles.line}></div>
                </div>
            </div>
            
            <div className={styles.middleSection}>
                <div className={styles.whyChoose}>
                    <h2>Why choose <span className={styles.gradientText}>HyprClub?</span></h2>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>

                <div className={clsx("row", styles.lunchYourFirstDiv)}>
                    <div className={clsx('col-md-6', styles.LunchYourFirstText)}>
                        <div className={styles.texts}>
                            <h3>Launch your first NFT for <span className={styles.gradientText}>FREE!</span></h3>
                            <p>Yes, you read it right! You can now launch your 1st NFT for absolutely FREE. It’s on us. We would even help you get started.</p>
                            <GradientBorder text='Get Started'/>
                        </div>
                    </div>  
                    <div className={clsx('col-md-6', styles.LunchYourFirstImg)}>
                        <img src="images/onBoard/nfts.png" alt="" />
                    </div>  
                </div>

                <div className="row">
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-6">
                        <div className={clsx( styles.LunchYourFirstText2)}>
                            <h3>No complexities. <br /> Only NFTs.</h3>
                            <p>It is no longer difficult or complex to be a part of the metaverse. Easily Buy or Sell NFTs through existing transaction methods like UPI, Credit/Debit & BNPL.</p>
                            <GradientBorder text='Get Started'/>
                        </div>  
                    </div>
                </div>
            </div>
           
        </div>
  </>;
};

export default CreatorOnboard;
