import { Dispatch } from "redux"
import { MODAL_CLOSE_SUCCESS, MODAL_OPEN_SUCCESS } from "../constants/profileModals"


interface modalOpenSucc {
    type: typeof MODAL_OPEN_SUCCESS
    payload: boolean
}

interface modalCloseSucc{
    type: typeof MODAL_CLOSE_SUCCESS
    payload: boolean
}

export type modalTypes = modalOpenSucc | modalCloseSucc
