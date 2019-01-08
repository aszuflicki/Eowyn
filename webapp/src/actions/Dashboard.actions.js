import axios from 'axios'
const io = require('socket.io-client')
const socket = io('http://localhost:8081')
const instance = axios.create({ baseURL: 'http://localhost:8081' })


export const updateLayout = (layout) => {
    return dispatch => {
        socket.emit('dashboard', layout);

        dispatch(layoutUpdated(layout))
    }
}

export const LAYOUT_UPDATED = 'LAYOUT_UPDATED';
export function layoutUpdated(data) {
    return {
        type: LAYOUT_UPDATED,
        payload: data
    };
}

export const getLayout = () => {
    return dispatch => {
        instance.get('/layout')
            .then(res => {
                dispatch(getLayoutSuccess({ layout: res.data.layout }))
            })
            .catch(err => {
                dispatch(getLayoutFailed())
            })
    }
}

export const GET_LAYOUT_FAILED = 'GET_LAYOUT_FAILED';
function getLayoutFailed(data) {
    return {
        type: GET_LAYOUT_FAILED,
        payload: data
    };
}

export const GET_LAYOUT_SUCCESS = 'GET_LAYOUT_SUCCESS';
function getLayoutSuccess(data) {
    return {
        type: GET_LAYOUT_SUCCESS,
        payload: data
    };
}

export const getSettings = () => {
    return dispatch => {
        instance.get('/settings')
            .then(res => {
                dispatch(getSettingsSuccess({ settings: res.data.settings }))
            })
            .catch(err => {
                dispatch(getSettingsFailed({}))
            })
    }
}

export const GET_SETTINGS_FAILED = 'GET_SETTINGS_FAILED';
function getSettingsFailed(data) {
    return {
        type: GET_SETTINGS_FAILED,
        payload: data
    };
}

export const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
function getSettingsSuccess(data) {
    return {
        type: GET_SETTINGS_SUCCESS,
        payload: data
    };
}






