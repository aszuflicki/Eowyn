import {
    REGISTRATION_SUCCESS, REGISTRATION_FAILED,
    LOGIN_FAILED, LOGIN_SUCCESS, CLEAN_ALERTS
} from './../actions/Auth.actions'

const authReducerDefaultState = {
    token: '',
    email: '',
    isRegistered: false,
    error_msgs: [],
    success_msgs: []
};

export default (state = authReducerDefaultState, action) => {
    switch (action.type) {


        case REGISTRATION_SUCCESS:
            console.log(action.payload)
            return { ...state, ...action.payload, success_msgs: [action.payload.success_msg] }

        case REGISTRATION_FAILED:
            return { ...state, isRegistered: false, error_msgs: [action.payload.error_msg.msg] }

        case LOGIN_FAILED:
            console.log(action.payload)
            return { ...state, error_msgs: [...state.error_msgs, action.payload.error_msg] }

        case LOGIN_SUCCESS:
            return { ...state, ...action.payload, success_msgs: [action.payload.success_msg] }

        case CLEAN_ALERTS:
            return { ...state, success_msgs: [], error_msgs: [] }


        default: return state
    }
}