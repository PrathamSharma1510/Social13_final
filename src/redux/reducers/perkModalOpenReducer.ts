
import { perkModalTypes } from "../actions/perksOpenModalAct"
import { PERK_MODAL_CLOSE_SUCCESS, PERK_MODAL_OPEN_SUCCESS } from "../constants/perkModal"

interface State{
    clicked : boolean
}

const defaultState: State = {
    clicked : false
}

export const perksModalOpenReducer = (state:State = defaultState, action: perkModalTypes): State => {
    switch (action.type){
        case PERK_MODAL_OPEN_SUCCESS:
            return { clicked: true}

        case PERK_MODAL_CLOSE_SUCCESS:
            return {clicked: false}

            default:
                return state
    }
}