import axios from 'axios'
import jwt from 'jsonwebtoken'
import history from '../routers/history'
import { toast } from "react-toastify";
// const instance = axios.create({ baseURL: '/api' })
const instance = axios.create({ baseURL: 'http://localhost:8081' })

export const register = (email, password) => {
    return dispatch => {

        if (email.length === 0 || password.length === 0) {
            toast.error('Fill all inputs');
            return dispatch(registrationFailed({ isRegistered: false }))
        }

        instance.post('/register', {
            email, password
        })
            .then(res => {
                console.log(res)
                if (res.status === 201) {
                    toast.success("Successfuly registrated");
                    dispatch(registrationSuccess({ isRegistered: true }))
                } else {
                    toast.error(res.data.msg.msg);
                    dispatch(registrationFailed({ isRegistered: false }))
                }
            })
            .catch(err => {
                toast.error('Email or password incorrect');
                dispatch(registrationFailed({ isRegistered: false }))
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
    return {
        type: REGISTRATION_SUCCESS,
        payload: data
    };
}

export const login = (email, password) => {
    return dispatch => {

        if (email.length === 0 || password.length === 0) {
            toast.error('Fill all inputs');
            return dispatch(loginFailed({}))
        }

        instance.post('/login', {
            email, password
        })
            .then(res => {
                if (res.status === 200) {
                    preserveToken(res.data.token)
                    toast.success("Logged in successfully");
                    dispatch(loginSuccess({ token: res.data.token }))
                } else {
                    toast.success(res.data.msg);
                    dispatch(loginFailed({ error_msg: res.data.msg }))
                }


            })
            .catch(err => {
                toast.error('Check email and password');

                dispatch(loginFailed({}))
            })
    }
}

export const checkIfLoggedIn = () => {
    return dispatch => {
        let token = retrieveToken()

        if (token) {
            jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
                if (err) {
                    clearLocalStorage()

                } else {
                    dispatch(loginSuccess({ token }))
                }
            });
        }
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

    data = { email: jwt.decode(data.token).email, ...data }
    return {
        type: LOGIN_SUCCESS,
        payload: data
    };
}

export const logout = () => {
    clearLocalStorage()
    history.push('/');
    toast.info("Logged out successfully");
    return dispatch => dispatch(logoutSuccess({}))

}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS,
        payload: {}
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


export const retrieveToken = () =>
    localStorage.getItem('token')

const clearLocalStorage = () =>
    localStorage.clear()

