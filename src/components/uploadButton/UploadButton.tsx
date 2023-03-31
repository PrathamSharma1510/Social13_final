
import React from 'react'
import { useDispatch } from 'react-redux'
import "./UploadButton.css"
import { Button } from 'react-bootstrap'
import { UPLOAD_BUTTON_OPEN_SUCCESS } from '../../redux/constants/uploadConst'


const  UploadButton = () => {

    const dispatch = useDispatch();
   
    const ButtonHandler=()=>{
        dispatch({type: UPLOAD_BUTTON_OPEN_SUCCESS})
        
    }
    return (
            <Button type="submit" onClick={ButtonHandler} className="upldbtn">Upload</Button>
    )
}

export default UploadButton
