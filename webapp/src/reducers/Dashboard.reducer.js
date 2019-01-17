import {
    GET_LAYOUT_SUCCESS, GET_SETTINGS_SUCCESS, GET_ALL_LAYOUTS_SUCCESS
} from '../actions/Dashboard.actions'

const dashboardReducerDefaultState = {
    layout: null,
    settings: null
};

export default (state = dashboardReducerDefaultState, action) => {
    switch (action.type) {


        case GET_LAYOUT_SUCCESS:
            let layouts = state.layouts
            layouts[action.payload.id] = action.payload.layouts
            return { ...state, layouts }

        case GET_SETTINGS_SUCCESS:
            return { ...state, settings: action.payload.settings }

        case GET_ALL_LAYOUTS_SUCCESS:
            return { ...state, layouts: action.payload.layouts }

        // case CLEAN_ALERTS:
        //     return { ...state, success_msgs: [], error_msgs: [] }


        default: return state
    }
}