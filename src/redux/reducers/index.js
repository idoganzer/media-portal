import {combineReducers} from 'redux'

import showReducer from "./showReducer";
import queueReducer from "./queueReducer";
import movieReducer from "./movieReducer";

export default combineReducers({
    shows: showReducer,
    downloadQueue: queueReducer,
    movies: movieReducer
});
