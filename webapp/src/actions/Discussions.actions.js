export const toggleEditModal = (isActive) => {
    return dispatch => {
        dispatch(toggleEditModalSuccess(isActive))
    }
}

export const TOGGLE_EDIT_MODAL_SUCCESS = 'TOGGLE_EDIT_MODAL_SUCCESS';
function toggleEditModalSuccess(isActive) {
    return {
        type: TOGGLE_EDIT_MODAL_SUCCESS,
        payload: isActive
    };
}
