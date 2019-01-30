import {
    GET_DISCUSSION_SUCCESS
} from '../actions/Discussions.actions'

const dashboardReducerDefaultState = {
    discussion: null,

};

export default (state = dashboardReducerDefaultState, action) => {
    switch (action.type) {
        case GET_DISCUSSION_SUCCESS:
            return { ...state, discussion: action.payload }



        // case CLEAN_ALERTS:
        //     return { ...state, success_msgs: [], error_msgs: [] }


        default: return state
    }
}