import {GET_MOVIE_CATALOG, REQ_FAILED, REQ_PENDING, REQ_SUCCESSFUL} from "../actions/actionTypes";

const initialState = {
    movieCatalog: [],
    reqState: 'idle'
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MOVIE_CATALOG:
            return {...state, movieCatalog: action.payload};
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

export default movieReducer;