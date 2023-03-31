import {Dispatch} from "redux";
import {UPLOADNFT_MODAL_OPEN_SUCCESS, UPLOADNFT_MODAL_CLOSE_SUCCESS} from "../constants/uploadnftmodal" 


interface uploadnftmodalOpenSucc{
    type:typeof UPLOADNFT_MODAL_OPEN_SUCCESS
    payload:boolean
}

interface uploadnftmodalCloseSucc{
    type:typeof UPLOADNFT_MODAL_CLOSE_SUCCESS
    payload:boolean
}

export type uploadnftmodalTypes = uploadnftmodalOpenSucc | uploadnftmodalCloseSucc