import {
    GET_DISCUSSION_SUCCESS, GET_DISCUSSIONS_LIST_SUCCESS, ADD_NEW_DISCUSSION_SUCCESS, NEW_POST_SUCCESS
} from '../actions/Discussions.actions'

const dashboardReducerDefaultState = {
    discussion: null,
    list: null
};

export default (state = dashboardReducerDefaultState, action) => {
    switch (action.type) {
        case GET_DISCUSSION_SUCCESS:
            return { ...state, discussion: action.payload }

        case GET_DISCUSSIONS_LIST_SUCCESS:
            return { ...state, list: action.payload }

        case ADD_NEW_DISCUSSION_SUCCESS:
            return { ...state, ...action.payload }

        case NEW_POST_SUCCESS:
            console.log(action.payload.data)
            return { ...state, }

        // case CLEAN_ALERTS:
        //     return { ...state, success_msgs: [], error_msgs: [] }


        default: return state
    }
}