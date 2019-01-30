import axios from 'axios'
import { retrieveToken } from './Auth.actions'
import history from '../routers/history'

// const io = require('socket.io-client')
// const socket = io('https://api.eowyn.szuflicki.tk')
// const socket = io('http://localhost:8081')
const instance = axios.create({ baseURL: 'http://localhost:8081' })

export const addNewDisscussion = (category, topic, desc, tags) => {
    return dispatch => {
        instance.post('/discussions', { category, topic, desc, tags }, { headers: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                console.log(res)
                dispatch(addNewDisscussionSuccess())
                history.push(`/discussions/${res.data.id}`)
            })
            .catch(err => { })
    }
}

export const ADD_NEW_DISCUSSION_SUCCESS = 'ADD_NEW_DISCUSSION_SUCCESS';
function addNewDisscussionSuccess() {
    return {
        type: ADD_NEW_DISCUSSION_SUCCESS,
        payload: {}
    };
}

export const getDisscussion = (id) => {
    return dispatch => {
        instance.get(`/discussions/${id}`, { headers: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                dispatch(getDisscussionSuccess(res))
            })
            .catch(err => { })
    }
}

export const GET_DISCUSSION_SUCCESS = 'GET_DISCUSSION_SUCCESS';
function getDisscussionSuccess(data) {
    return {
        type: ADD_NEW_DISCUSSION_SUCCESS,
        payload: {data}
    };
}