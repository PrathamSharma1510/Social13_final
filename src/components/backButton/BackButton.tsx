import React from 'react'
import {Button} from 'react-bootstrap'
import "./BackButton.css"

function BackButton() {
    const ButtonHandler=()=>{
        console.log("back")
    }
    return (
       
            <Button type="submit" className="back" onClick={ButtonHandler}>
                <img src="./images/back-arrow.png" alt=""/>

            </Button>
            
    )
}

export default BackButton
