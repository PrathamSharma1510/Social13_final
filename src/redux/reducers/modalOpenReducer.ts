
import { modalTypes } from "../actions/modalOpenAction"
import { MODAL_CLOSE_SUCCESS, MODAL_OPEN_SUCCESS } from "../constants/profileModals"

interface State{
    clicked : boolean
}

const defaultState: State = {
    clicked : false
}

export const modalOpenReducer = (state:State = defaultState, action: modalTypes): State => {
    switch (action.type){
        case MODAL_OPEN_SUCCESS:
            return { clicked: true}

        case MODAL_CLOSE_SUCCESS:
            return {clicked: false}

            default:
                return state
    }
}