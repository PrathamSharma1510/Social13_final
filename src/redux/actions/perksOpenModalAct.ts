import { Dispatch } from "redux"
import { PERK_MODAL_CLOSE_SUCCESS, PERK_MODAL_OPEN_SUCCESS } from "../constants/perkModal"


interface perkModalOpenSucc {
    type: typeof PERK_MODAL_OPEN_SUCCESS
    payload: boolean
}

interface perkModalCloseSucc{
    type: typeof PERK_MODAL_CLOSE_SUCCESS
    payload: boolean
}

export type perkModalTypes = perkModalOpenSucc | perkModalCloseSucc
