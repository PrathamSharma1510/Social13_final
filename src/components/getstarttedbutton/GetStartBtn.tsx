import React from 'react'
import {Button} from 'react-bootstrap'
import "./GetStartBtn.css"

const  GetStartBtn = () => {
    const ButtonHandler=()=>{
        console.log("lets get started");
    }
    return (
        <div className="getStart">
            <Button type="button" className="gtstarted" onClick={ButtonHandler}>
                Get Started

            </Button>
            
        </div>
    )
}

export default GetStartBtn
