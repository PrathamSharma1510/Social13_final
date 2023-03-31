import React from 'react'
import "./SkipButton.css"

function SkipButton() {
    const ButtonHandler=()=>{
        console.log("you clicked this button to skip")
    }
    return (
        <button className="SkipButton" type="submit" onClick={ButtonHandler}>
            <p>Skip</p>
        </button>
    )
}

export default SkipButton