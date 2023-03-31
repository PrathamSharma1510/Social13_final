import React from 'react';
import './logo.css';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className='p-4'>
        <Link to='/'>
         <img className='logoImg' src="images/logo.png" alt="" />
        </Link>

        </div>
    )
}

export default Logo;
