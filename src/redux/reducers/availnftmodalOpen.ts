import { availnftmodalTypes } from "../actions/availnftmodalOpenAction"
import { AVAILNFT_MODAL_OPEN_SUCCESS, AVAILNFT_MODAL_CLOSE_SUCCESS } from "../constants/availnftModal"
interface State {
    clicked_a: boolean
}
const initialState: State = {
    clicked_a: false
}
export const availnftmodalOpenReducer = (state: State = initialState, action: availnftmodalTypes) => {
    switch (action.type) {
        case AVAILNFT_MODAL_OPEN_SUCCESS:
            return {
                clicked_a: true
            }

        case AVAILNFT_MODAL_CLOSE_SUCCESS:
            return {
                clicked: false
            }
        default:
            return state
    }
}