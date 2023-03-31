import { Dispatch } from "redux"
import { UPLOAD_BUTTON_CLOSE_SUCCESS, UPLOAD_BUTTON_OPEN_SUCCESS } from "../constants/uploadConst"


interface uploadBtnSucc {
    type: typeof UPLOAD_BUTTON_OPEN_SUCCESS
    payload: boolean
}

interface uploadBtnCloseSucc{
    type: typeof UPLOAD_BUTTON_CLOSE_SUCCESS
    payload: boolean
}

export type uploadBtnTypes = uploadBtnSucc | uploadBtnCloseSucc
