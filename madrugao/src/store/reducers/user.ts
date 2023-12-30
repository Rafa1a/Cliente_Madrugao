import { user_fun } from "../../interface/inter"
import { GET_USER, LOGIN_USER, LOGIN_USER_INFO, SET_QR_CODE } from "../action/actionTypes"

interface actions {
    type :string,
    payload:any
}
const initialState:any = {
    users:undefined,
    user:undefined,
    user_info:undefined,
    qrcode:false
}


const reducer = (state = initialState, action:actions) =>{
    switch(action.type) {
        case GET_USER : 
            return {
                ...state,
                users:action.payload
            }
        case LOGIN_USER : 
            return {
                ...state,
                user:action.payload
            }
        case LOGIN_USER_INFO : 
            return {
                ...state,
                user_info:action.payload
            }   
        case SET_QR_CODE : 
            return {
                ...state,
                qrcode:action.payload
            }   
        default :
            return state
    }
}
export default reducer