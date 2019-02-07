import {
    REGISTRATION_SUCCESS, REGISTRATION_FAILED,
    LOGIN_FAILED, LOGIN_SUCCESS, CLEAN_ALERTS, LOGOUT_SUCCESS
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
            return { ...state, ...action.payload }

        case REGISTRATION_FAILED:
            return { ...state, isRegistered: false }

        case LOGIN_FAILED:
            return { ...state }

        case LOGIN_SUCCESS:
            return { ...state, ...action.payload }

        case LOGOUT_SUCCESS:
            return {
                token: '',
                email: '',
                isRegistered: false,
                error_msgs: [],
                success_msgs: ['Logged out successfully']
            }

        case CLEAN_ALERTS:
            return { ...state, success_msgs: [], error_msgs: [] }


        default: return state
    }
}