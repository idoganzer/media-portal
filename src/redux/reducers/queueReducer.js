import {GET_SHOW_QUEUE, REQ_PENDING, REQ_SUCCESSFUL, REQ_FAILED} from "../actions/actionTypes";

const initialState = {
    downloadQueue: [],
    reqState: 'idle'
};

const queueReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SHOW_QUEUE:
            return {...state, downloadQueue: action.payload};
        case REQ_PENDING:
            return {...state, reqState: 'Pending'};
        case REQ_FAILED:
            return {...state, reqState: 'Failed'};
        case REQ_SUCCESSFUL:
            return {...state, reqState: 'Success'};
        default:
            return state
    }
};

export default queueReducer;