import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className="footer">
            <div className="Container">

                <div id="row">

                    <div className="footer-col-left">
                        <div className="footer-col-left-title">
                            <p>Democratizing the Creator Economy</p>
                            <div className="footer-col-left-phrase">
                                <p>Lorem ipsum dolor sit amet. consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className="footer-col-left-logos">
                            <Link to="#" className="link"> <img id="fb" src="./images/facebook.svg" alt="" /></Link>
                            <Link to="#" className="link">  <img id="insta" src="./images/instagram.svg" alt="" /></Link>
                            <Link to="#" className="link">  <img id="link" src="./images/linkedin.svg" alt="" /></Link>
                            <Link to="#" className="link">  <img id="twit" src="./images/twitter.svg" alt="" /></Link>
                        </div>
                        <div className="footer-col-left-right">
                            <p>All Rights Reserved With HyprClub.</p>
                        </div>

                    </div>

                    <div className="footer-col">

                        <li className="footer-col-title"><Link to="#" className="link">HyprClub</Link></li>

                        <li><Link to="#" className="link">Home</Link></li>
                        <li><Link to="#" className="link"> Discover</Link></li>
                        <li><Link to="#" className="link"> Marketplace</Link></li>
                        <li><Link to="#" className="link">Store</Link> </li>
                    </div>
                    <div className="footer-col">

                        <li className="footer-col-title"><Link to="#" className="link">Company</Link></li>


                        <li><Link to="#" className="link">Contact Us</Link></li>
                        <li> <Link to="#" className="link">About Us</Link></li>
                        <li><Link to="#" className="link"> FAQs</Link></li>
                        <li><Link to="#" className="link">Careers</Link></li>



                    </div>
                    <div id="other" className="footer-col">
                        <li className="footer-col-title"><Link to="#" className="link">Other</Link></li>
                        <li><Link to="#" className="link"> Terms of Use</Link></li>
                        <li><Link to="#" className="link">Privacy Policy</Link></li>
                       
                        <Link to="#" className="link"><img id="logoimg" src="./images/logo.png" alt="" /></Link>
                       
                        <div className="footer-col--right">
                            <p>All Rights Reserved With HyprClub.</p>
                        </div>
                       
                        </div>
                   
                    <div className="footer-col-logo">
                        <Link to="#" className="link"><img  src="./images/logo.png" alt="" /></Link>

                    </div>



                </div>

            </div>
        </div>
    )
}

export default Footer
