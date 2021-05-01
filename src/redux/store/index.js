import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "../reducers";

const initialState = {
    showCalendar: [],
    showHistory: [],
    showQueue: [],
    missingShows:[],
    showCatalog: [],
    loadedState: []
};


const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default store;