import clsx from 'clsx';
import React from 'react';
import './socials.css';

interface Purpose {
    purpose: string,
    login: boolean,
    registerGoogle? : any,
    loginGoogle ?: any,
    registerFacebook? : any,
    loginFacebook ?: any
}

const SocialLogins = ({login,purpose, loginGoogle, registerGoogle, loginFacebook, registerFacebook}: Purpose) => {
    return (
        <div className={clsx(' mt-4 justify-content-center mb-3', login ? 'd-flex flex-column align-items-center' : "row")}>
            <button onClick={login? loginGoogle : registerGoogle} className={clsx(" m-1 ", !login ? 'col-md-5 register' : "Login")}>
                <img className='me-3 googleImg gl' src="images/Google.png" alt="google" />
                <p className='socialLoginText'>{purpose} with Google</p>
            </button>
            <button onClick={login? loginFacebook : registerFacebook} className={clsx(" m-1 ", !login ? 'col-md-5 register' : " Login")}>
                <img className='me-3 googleImg fb' src="images/Facebook.png" alt="google" />
                <p className='socialLoginText'>{purpose} with Facebook</p>
            </button>
        </div>
    )
}

export default SocialLogins
