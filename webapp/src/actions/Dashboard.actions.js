import axios from 'axios'
import { retrieveToken } from './Auth.actions'

const io = require('socket.io-client')
// const socket = io('https://api.eowyn.szuflicki.tk')
const socket = io('http://localhost:8081')
const instance = axios.create({ baseURL: 'http://localhost:8081' })


export const updateLayout = (layout, no = 0) => {
    return dispatch => {
        socket.emit('dashboard_layout', no, layout, retrieveToken());

        dispatch(layoutUpdated(layout, no))
        // dispatch(getLayoutSuccess({ layout }))

    }
}

export const LAYOUT_UPDATED = 'LAYOUT_UPDATED';
export function layoutUpdated(...data) {
    return {
        type: LAYOUT_UPDATED,
        payload: data
    };
}

export const updateSettings = (settings, no = 0) => {
    return dispatch => {
        socket.emit('dashboard_settings', no, settings, retrieveToken());

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

export const getLayout = (no = 0) => {
    return dispatch => {
        instance.get(`/layouts`, { params: { "authorization": localStorage.getItem('token') } })
        instance.get(`/layout?no=${no}`, { params: { "authorization": localStorage.getItem('token') } })
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

export const getAllLayouts = () => {
    return dispatch => {
        instance.get(`/layouts`, { params: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                return dispatch(getAllLayoutsSuccess({ layouts: res.data }))
            })
            .catch(err => {
                dispatch(getAllLayoutsFailed())
            })
    }
}

export const GET_ALL_LAYOUTS_FAILED = 'GET_ALL_LAYOUTS_FAILED';
function getAllLayoutsFailed(data) {
    return {
        type: GET_ALL_LAYOUTS_FAILED,
        payload: data
    };
}

export const GET_ALL_LAYOUTS_SUCCESS = 'GET_ALL_LAYOUTS_SUCCESS';
function getAllLayoutsSuccess(data) {
    return {
        type: GET_ALL_LAYOUTS_SUCCESS,
        payload: data
    };
}

export const getTabs = () => {
    return dispatch => {
        instance.get('/tabs', { params: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                return dispatch(getTabsSuccess({ tabs: res.data }))
            })
            .catch(err => {
                dispatch(getTabsFailed())
            })
    }
}

export const GET_TABS_FAILED = 'GET_TABS_FAILED';
function getTabsFailed(data) {
    return {
        type: GET_TABS_FAILED,
        payload: data
    };
}

export const GET_TABS_SUCCESS = 'GET_TABS_SUCCESS';
function getTabsSuccess(data) {
    return {
        type: GET_TABS_SUCCESS,
        payload: data
    };
}

export const getSettings = () => {
    return dispatch => {
        instance.get('/settings', { params: { "authorization": localStorage.getItem('token') } })
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






