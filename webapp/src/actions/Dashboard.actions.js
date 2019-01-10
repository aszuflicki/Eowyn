import axios from 'axios'
import { retrieveToken } from './Auth.actions'

const io = require('socket.io-client')
const socket = io('http://localhost:8081')
const instance = axios.create({ baseURL: 'http://localhost:8081' })

export const updateLayout = (layout) => {
    return dispatch => {
        socket.emit('dashboard_layout', layout, retrieveToken());

        dispatch(layoutUpdated(layout))
        // dispatch(getLayoutSuccess({ layout }))

    }
}

export const LAYOUT_UPDATED = 'LAYOUT_UPDATED';
export function layoutUpdated(data) {
    return {
        type: LAYOUT_UPDATED,
        payload: data
    };
}

export const updateSettings = (settings) => {
    return dispatch => {
        socket.emit('dashboard_settings', settings, retrieveToken());

        dispatch(settingsUpdated(settings))
        dispatch(getSettingsSuccess({ settings }))
    }
}

export const SETTINGS_UPDATED = 'SETTINGS_UPDATED';
export function settingsUpdated(data) {
    return {
        type: LAYOUT_UPDATED,
        payload: data
    };
}

export const getLayout = () => {
    return dispatch => {
        instance.get('/layout', { headers: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                return dispatch(getLayoutSuccess({ layout: res.data }))
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
        instance.get('/settings', { headers: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                dispatch(getSettingsSuccess({ settings: res.data }))
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






