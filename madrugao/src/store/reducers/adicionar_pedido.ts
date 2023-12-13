import {actions } from "../../interface/inter_actions"
import { SET_ADICIONAR_PEDIDO_ITENS } from "../action/actionTypes"

const inicial_state_ ={
    adicionar_pedido:undefined
}
const reducer = (state = inicial_state_, action:actions) =>{
    switch (action.type) {
        case SET_ADICIONAR_PEDIDO_ITENS : {
            return {
                ...state,
                adicionar_pedido: action.payload
            }
        }
        default :
            return state
    }
}
export default reducer