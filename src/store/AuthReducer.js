import {
    AUTHENTICATE,
    LOG_OUT,
    UPDATE_FAMILY_DATA,
    CLEAR_FAMILY_DATA,
    RESET_PARTENERS_LIST,
    RESET_SONS_LIST,
    RESET_DRIVERS_LIST,
    RESET_SERVANTS_LIST,

} from "./AuthActons"

const initialState = {
    token: "",
    user: null,
    partenersList: [],
    sonsList: [],
    servantsList: [],
    driversList: []
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                user: action.user,
                partenersList: [],
                sonsList: [],
                servantsList: [],
                driversList: []

            }
        case LOG_OUT:
            return {
                ...state,
                token: "",
                user: null

            }
        case UPDATE_FAMILY_DATA:
         return action.personType ==="parteners" ?
           {
                ...state,
                partenersList: [...action.list],
            } : action.personType ==="Sons" ?  {
                ...state,
                 sonsList: [...action.list],
            } :action.personType ==="Drivers" ?  {
                ...state,
                driversList: [...action.list],
            } : {
                ...state,
                servantsList: [...action.list]
            }

        case CLEAR_FAMILY_DATA:
            return {
                ...state,
                partenersList: [],
                sonsList: [],
                driversList: [],
                servantsList: []

            }
        case RESET_PARTENERS_LIST:
            return {
                ...state,
                partenersList: []
            }
        case RESET_DRIVERS_LIST:
            return {
                ...state,
                driversList: []
            }
        case RESET_SONS_LIST:
            return {
                ...state,
                sonsList: []
            }
        case RESET_SERVANTS_LIST:
            return {
                ...state,
                servantsList: []
            }
        default:
            return state
    }
}
export default authReducer