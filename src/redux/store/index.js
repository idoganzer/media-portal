import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';

import calendarSlice from "../features/shows/calendarSlice";
import historySlice from "../features/shows/historySlice";
import catalogSlice from "../features/shows/catalogSlice";
import queueSlice from "../features/shows/queueSlice";
import wantedSlice from "../features/shows/wantedListSlice"
import movieCatalogSlice from "../features/movies/movieCatalogSlice";
import toggleTheme from "../features/toggleTheme";
import sonarrCommand from "../features/shows/sonarrCommand";


const reducer = {
    showCalendar: calendarSlice,
    showHistory: historySlice,
    showCatalog: catalogSlice,
    showQueue: queueSlice,
    showWanted: wantedSlice,
    movieCatalog: movieCatalogSlice,
    themeControl: toggleTheme,
    sonarr: sonarrCommand
};

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;