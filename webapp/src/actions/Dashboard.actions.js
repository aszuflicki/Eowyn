import axios from 'axios'
import { retrieveToken } from './Auth.actions'
import history from '../routers/history'

const io = require('socket.io-client')
// const socket = io('https://api.eowyn.szuflicki.tk')
const socket = io('/api')
const instance = axios.create({ baseURL: '/api' })


export const updateLayout = (layout) => {
    return dispatch => {
        socket.emit('dashboard_layout', layout, retrieveToken());
        console.log(layout)
        dispatch(getLayoutSuccess({ layout }))
    }
}

export const LAYOUT_UPDATED = 'LAYOUT_UPDATED';
export function layoutUpdated(...data) {
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

export const getLayout = (no = 0) => {
    return dispatch => {
        instance.get(`/layout`, { params: { "authorization": localStorage.getItem('token') } })
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

export const setTabActive = (id) => {
    return dispatch => {
        dispatch(setTabActiveSuccess(id))
        history.push(`/dashboard/${id}`)
    }
}

export const SET_TAB_ACTIVE_SUCCESS = 'SET_TAB_ACTIVE_SUCCESS';
function setTabActiveSuccess(data) {
    return {
        type: SET_TAB_ACTIVE_SUCCESS,
        payload: data
    };
}

export const toggleEditMode = (isActive) => {
    return dispatch => {
        dispatch(toggleEditModeSuccess(isActive))
    }
}

export const TOGGLE_EDIT_MODE_SUCCESS = 'TOGGLE_EDIT_MODE_SUCCESS';
function toggleEditModeSuccess(isActive) {
    return {
        type: TOGGLE_EDIT_MODE_SUCCESS,
        payload: isActive
    };
}

export const toggleAddModal = (isActive) => {
    return dispatch => {
        dispatch(toggleAddModalSuccess(isActive))
    }
}

export const TOGGLE_ADD_MODAL_SUCCESS = 'TOGGLE_ADD_MODAL_SUCCESS';
function toggleAddModalSuccess(isActive) {
    return {
        type: TOGGLE_ADD_MODAL_SUCCESS,
        payload: isActive
    };
}

export const toggleEditModal = (isActive, i) => {
    return dispatch => {
        dispatch(toggleEditModalSuccess(isActive, i))
    }
}

export const TOGGLE_EDIT_MODAL_SUCCESS = 'TOGGLE_EDIT_MODAL_SUCCESS';
function toggleEditModalSuccess(isActive, i) {
    return {
        type: TOGGLE_EDIT_MODAL_SUCCESS,
        payload: { isActive, i }
    };
}

export const toggleAddTabModal = (isActive) => {
    return dispatch => {
        dispatch(toggleAddTabModalSuccess(isActive))
    }
}

export const TOGGLE_ADD_TAB_MODAL_SUCCESS = 'TOGGLE_ADD_TAB_MODAL_SUCCESS';
function toggleAddTabModalSuccess(isActive) {
    return {
        type: TOGGLE_ADD_TAB_MODAL_SUCCESS,
        payload: { isActive }
    };
}

export const toggleDeleteTabModal = (isActive) => {
    return dispatch => {
        dispatch(toggleDeleteTabModalSuccess(isActive))
    }
}

export const TOGGLE_DELETE_TAB_MODAL_SUCCESS = 'TOGGLE_DELETE_TAB_MODAL_SUCCESS';
function toggleDeleteTabModalSuccess(isActive) {
    return {
        type: TOGGLE_DELETE_TAB_MODAL_SUCCESS,
        payload: { isActive }
    };
}

export const toggleEditTabModal = (isActive, index) => {
    return dispatch => {
        dispatch(toggleEditTabModalSuccess(isActive, index))
    }
}

export const TOGGLE_EDIT_TAB_MODAL_SUCCESS = 'TOGGLE_EDIT_TAB_MODAL_SUCCESS';
function toggleEditTabModalSuccess(isActive, index) {
    return {
        type: TOGGLE_EDIT_TAB_MODAL_SUCCESS,
        payload: { isActive, index }
    };
}


