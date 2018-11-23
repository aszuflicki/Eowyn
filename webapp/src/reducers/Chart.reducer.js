const chartReducerDefaultState = {
    x: [],
    y: [],
    type: 'line',
    layout: { autosize: true, title: 'A Fancy Plot'
    // , plot_bgcolor: '#32393E'
    // , paper_bgcolor: '#32393E'
 }, frames: [], config: {}
};

export default (state = chartReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_TICK':
            const { x, y } = action.payload
            return {
                ...state,
                x: [...state.x, x],
                y: [...state.y, y]
            }

        case 'SET_FIGURE':
            const { frames, layout } = action.payload
            return { ...state, frames, layout }

        case 'SET_ZOOM':
        console.log(action.payload)
            return { ...state, layout: action.payload }


        default: return state
    }
}