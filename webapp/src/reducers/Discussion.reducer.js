import {
    GET_DISCUSSION_SUCCESS, GET_DISCUSSIONS_LIST_SUCCESS, ADD_NEW_DISCUSSION_SUCCESS, NEW_POST_SUCCESS,
    GET_FOLLOWS_SUCCESS, FOLLOW_SUCCESS, UNFOLLOW_SUCCESS, NOTIFY_NEW_POST_SUCCESS
} from '../actions/Discussions.actions'

const dashboardReducerDefaultState = {
    discussion: null,
    list: null,
    follows: null
};

export default (state = dashboardReducerDefaultState, action) => {
    switch (action.type) {
        case GET_DISCUSSION_SUCCESS:
            return { ...state, ...action.payload }

        case GET_DISCUSSIONS_LIST_SUCCESS:
            return { ...state, list: action.payload }

        case ADD_NEW_DISCUSSION_SUCCESS:
            return { ...state, ...action.payload }

        case GET_FOLLOWS_SUCCESS:
            console.log(action.payload.data)
            return { ...state, follows: action.payload }

        case FOLLOW_SUCCESS:
            return { ...state, follows: [action.payload + "", ...state.follows] }

        case UNFOLLOW_SUCCESS:
            return { ...state, follows: state.follows.filter(el => el != action.payload) }

        case NOTIFY_NEW_POST_SUCCESS:
            return { ...state, posts: [action.payload, ...state.posts] }


        // case CLEAN_ALERTS:
        //     return { ...state, success_msgs: [], error_msgs: [] }


        default: return state
    }
}