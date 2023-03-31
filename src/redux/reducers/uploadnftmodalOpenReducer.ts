import { uploadnftmodalTypes } from "../actions/uploadnftmodalOpenAction"
import { UPLOADNFT_MODAL_OPEN_SUCCESS, UPLOADNFT_MODAL_CLOSE_SUCCESS } from "../constants/uploadnftmodal"

interface State {
    clicked_u: boolean
}

const initialState: State = {
    clicked_u: false
}

export const uploadnftmodalOpenReducer = (state: State = initialState, action: uploadnftmodalTypes) => {
    switch (action.type) {
        case UPLOADNFT_MODAL_OPEN_SUCCESS:
            return {
                clicked_u: true
            }       

        case UPLOADNFT_MODAL_CLOSE_SUCCESS:
            return {
                clicked_u: false
            }
        default:
             return state
    }
}