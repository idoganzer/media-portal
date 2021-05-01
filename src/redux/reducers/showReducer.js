import {
    GET_SHOW_CALENDAR,
    GET_SHOW_CATALOG,
    GET_SHOW_HISTORY,
    REQ_FAILED,
    REQ_PENDING,
    REQ_SUCCESSFUL
} from "../actions/actionTypes";

const initialState = {
    showCalendar: [],
    showHistory: [],
    showCatalog: [],
    reqState: 'idle'
};

const showReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SHOW_CALENDAR:
            return {...state, showCalendar: action.payload};
        case GET_SHOW_HISTORY:
            return {...state, showHistory: action.payload};
        case GET_SHOW_CATALOG:
            return {...state, showCatalog: action.payload};
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

export default showReducer;