import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:8081' })


export const register = (email, password) => {
    return dispatch => {

        if (email.length === 0 || password.length === 0) {
            dispatch(registrationFailed({ error_msg: 'Fill all inputs', isRegistered: false }))
        }

        instance.post('/register', {
            email, password
        })
            .then(res => {
                if (res.status === 201) {
                    dispatch(registrationSuccess({ success_msg: 'Successfuly registrated', isRegistered: true }))
                } else {

                    dispatch(registrationFailed({ error_msg: res.data.msg, isRegistered: false }))
                }


            })
            .catch(err => {
                dispatch(registrationFailed({ error_msg: 'Email or password incorrect', isRegistered: false }))
            })
    }
}

export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';
export function registrationFailed(data) {
    return {
        type: REGISTRATION_FAILED,
        payload: data
    };
}

export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export function registrationSuccess(data) {
    console.log('xdd')
    return {
        type: REGISTRATION_SUCCESS,
        payload: data
    };
}

export const login = (email, password) => {
    return dispatch => {

        if (email.length === 0 || password.length === 0) {
            dispatch(loginFailed({ error_msg: 'Fill all inputs' }))
        }

        instance.post('/login', {
            email, password
        })
            .then(res => {
                if (res.status === 200) {
                    preserveToken(res.data.token)
                    dispatch(loginSuccess({ success_msg: 'Successfuly logged in', token: res.data.token }))
                } else {
                    dispatch(loginFailed({ error_msg: res.data.msg }))
                }


            })
            .catch(err => {
                dispatch(loginFailed({ error_msg: 'Check email and password' }))
            })
    }
}

export const checkIfLoggedIn = () => {
    return dispatch => {

        let token = retrieveToken()
        if(token)
        dispatch(loginSuccess({ success_msg: 'Successfuly logged in', token }))
    }
}

export const LOGIN_FAILED = 'LOGIN_FAILED';
export function loginFailed(data) {
    return {
        type: LOGIN_FAILED,
        payload: data
    };
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    };
}


export const cleanAlerts = () => {
    return dispatch => {
        dispatch(cleanedAlerts)
    }
}

export const CLEAN_ALERTS = 'CLEAN_ALERTS';
export function cleanedAlerts(data) {
    return {
        type: CLEAN_ALERTS,
        payload: data
    };
}

const preserveToken = (token) =>
    localStorage.setItem('token', token)


const retrieveToken = (token) =>
    localStorage.getItem('token')

const clearLocalStorage = () =>
    localStorage.clear()

