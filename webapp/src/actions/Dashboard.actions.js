const io = require('socket.io-client')
const socket = io('http://localhost:8081')


export const updateLayout = (layout) => {
    return dispatch => {
        console.log('update lauoyt')
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






