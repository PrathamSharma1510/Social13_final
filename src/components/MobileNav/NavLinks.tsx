import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import ExpSearchBar from '../expandablesearch/ExpSearchBar';
const NavLinks = (props:any) => {
    const animateFrom = { opacity: 0, y: -40 }
    const animateTo = { opacity: 1, y: 0 }
    return (

        <ul>
            <motion.li 
                id="srch"
                initial={animateFrom}
                animate={animateTo}
                transition={{delay:0.05}}>
                 <ExpSearchBar/></motion.li>

            <motion.li
                initial={animateFrom}
                animate={animateTo}
                transition={{delay:0.10}}
                onClick={() => props.isMobile && props.closeMobileMenu()}> <Link to="#" className="link_nav">Home</Link></motion.li>
            <motion.li
                initial={animateFrom}
                animate={animateTo}
                transition={{delay:0.15}}
                onClick={() => props.isMobile && props.closeMobileMenu()}> <Link to="#" className="link_nav">Contact</Link></motion.li>
            <motion.li
                initial={animateFrom}
                animate={animateTo}
                transition={{delay:0.20}}
                onClick={() => props.isMobile && props.closeMobileMenu()}> <Link to="#" className="link_nav"> Account</Link></motion.li>
            <motion.li
                initial={animateFrom}
                animate={animateTo}
                transition={{delay:0.25}}
                onClick={() => props.isMobile && props.closeMobileMenu()}> <Link to="#" className="link_nav">Discover</Link></motion.li>
            <motion.li
                initial={animateFrom}
                animate={animateTo}
                transition={{delay:0.30}}
                onClick={() => props.isMobile && props.closeMobileMenu()}> <Link to="#" className="link_nav">Creator</Link></motion.li>

        </ul>

    );
}

export default NavLinks



