import { Dispatch } from "redux"
import { AVAILNFT_MODAL_OPEN_SUCCESS, AVAILNFT_MODAL_CLOSE_SUCCESS } from "../constants/availnftModal"


interface availnftmodalOpenSucc {
    type: typeof AVAILNFT_MODAL_OPEN_SUCCESS
    payload: boolean
}
interface availnftmodalCloseSucc {
    type: typeof AVAILNFT_MODAL_CLOSE_SUCCESS
    payload: boolean
}

export type availnftmodalTypes = availnftmodalOpenSucc | availnftmodalCloseSucc;