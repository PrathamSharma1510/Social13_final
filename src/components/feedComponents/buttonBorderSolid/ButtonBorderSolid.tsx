import React from 'react'
import { Button } from 'react-bootstrap';
import './buttonBorderSolid.css'

interface ButtonSolid{
    buttonText: string
}

const ButtonBorderSolid = ({buttonText}: ButtonSolid) => {

    const buttonhandler = () => {
        console.log('Made by Sandip Rout');
    }
    return (
        <div>
            <Button type='submit' onClick={buttonhandler} className='buttonSolidBorder'>{buttonText}</Button>
        </div>
    )
}

export default ButtonBorderSolid
