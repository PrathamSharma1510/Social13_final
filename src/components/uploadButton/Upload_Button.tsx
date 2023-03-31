
import React from 'react'
import {Button} from 'react-bootstrap'
import "./UploadButton.css"

function Upload_Button() {
    const ButtonHandler=()=>{
        console.log("your file has been uploaded")
    }
    return (
        <div className="upButton">
            <button type="submit" onClick={ButtonHandler} className="upldbtn">Upload</button>
            
        </div>
    )
}

export default Upload_Button
