import React from 'react'
import { Button } from 'react-bootstrap'
import './continue.css'


const buttonhandler = () =>{
    console.log("Hello there");
    
}

const Continue = () => {
    return (
            <Button type='submit' onClick={buttonhandler} className='continueBtn'>Continue</Button>
    )
}

export default Continue
