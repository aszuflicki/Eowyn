
export const addTick = (x, y) => {

    return dispatch => dispatch(addTickSuccess(x,y))
}

const addTickSuccess = (x,y) => {

    return {
        type: "ADD_TICK",
        payload: {x,y}
    }
}

export const setFigure = (figure) => {
    return dispatch => dispatch(setFigureSuccess(figure))
}

const setFigureSuccess = (figure) => {
    return {
        type: "SET_FIGURE",
        payload: figure
    }
}

export const setZoom = (layout) => {
    console.log("ssdsdsdsdssssssssssssssssssssss")
    return dispatch => dispatch(setZoomSuccess(layout))
}

const setZoomSuccess = (layout) => {
    return {
        type: "SET_ZOOM",
        payload: layout
    }
}