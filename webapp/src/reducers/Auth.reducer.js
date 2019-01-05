import {
    REGISTRATION_SUCCESS, REGISTRATION_FAILED,
    LOGIN_FAILED, LOGIN_SUCCESS
} from './../actions/Auth.actions'

const authReducerDefaultState = {
    token: '',
    email: '',
    isRegistered: false
};

export default (state = authReducerDefaultState, action) => {
    switch (action.type) {


        case REGISTRATION_SUCCESS:
            console.log(action.payload)
            return { ...state, ...action.payload }

        case REGISTRATION_FAILED:
            return { ...state, ...action.payload }

        case LOGIN_FAILED:
            console.log(action.payload)
            return { ...state, ...action.payload }

        case LOGIN_SUCCESS:
            return { ...state, ...action.payload }


        default: return state
    }
}