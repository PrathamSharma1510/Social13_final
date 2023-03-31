import { uploadBtnTypes } from "../actions/uploadActions"
import {  UPLOAD_BUTTON_CLOSE_SUCCESS, UPLOAD_BUTTON_OPEN_SUCCESS } from "../constants/uploadConst"

interface State{
    clicked : boolean
}

const defaultState: State = {
    clicked : false
}

export const uploadBtnReducer = (state:State = defaultState, action: uploadBtnTypes): State => {
    switch (action.type){
        case UPLOAD_BUTTON_OPEN_SUCCESS:
            return { clicked: true}

        case UPLOAD_BUTTON_CLOSE_SUCCESS:
            return {clicked: false}

            default:
                return state
    }
}