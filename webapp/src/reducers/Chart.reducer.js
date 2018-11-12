const chartReducerDefaultState = {
    x: [],
    y: [],
    type: 'line',
    layout: { width: 800, height: 640, title: 'A Fancy Plot', plot_bgcolor: '#252120', paper_bgcolor: '#252120' }, frames: [], config: {}
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
            return { ...state, layout: action.payload }


        default: return state
    }
}