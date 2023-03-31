import React, {useState} from 'react'
// import MenuIcon from '@material-ui/core/Menu';
import "./MobileNavigation.css"
// import CloseIcon from '@mui/icons-material/Close
import NavLinks from './NavLinks';


function MobileNavigation() {
    const [open,SetOpen]=useState(false);
    const hamburgerIcon=  <div className={open? "Menu-baropen" : "Menu-bar"} onClick={()=> SetOpen(!open)}>
    <div  className="bar1"></div>
    </div>
    const closeIcon=   <div className={open? "Menu-baropen" : "Menu-bar"} onClick={()=> SetOpen(!open)}>
    <div  className="bar1"></div>
    </div>
    const closeMobileMenu=()=> SetOpen(false)
    return (
        <nav className="Mobile_nav">
       
          
             {open? closeIcon: hamburgerIcon}
             {open &&  <NavLinks  isMobile={true} closeMobileMenu={closeMobileMenu}/>}

        </nav>
    )
}
 
export default MobileNavigation
