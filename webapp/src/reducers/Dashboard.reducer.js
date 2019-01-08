import {
    GET_LAYOUT_SUCCESS, GET_SETTINGS_SUCCESS
} from '../actions/Dashboard.actions'

const dashboardReducerDefaultState = {
    layout: null,
    settings: null
};

export default (state = dashboardReducerDefaultState, action) => {
    switch (action.type) {


        case GET_LAYOUT_SUCCESS:
            return { ...state, layout: action.payload.layout }

        case GET_SETTINGS_SUCCESS:
            return { ...state, settings: action.payload.settings }

        // case CLEAN_ALERTS:
        //     return { ...state, success_msgs: [], error_msgs: [] }


        default: return state
    }
}