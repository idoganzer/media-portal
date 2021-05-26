import {getShowQueue} from "./shows/queueSlice";
import {getShowHistory} from "./shows/historySlice";
import {getShowCalendar} from "./shows/calendarSlice";
import {getShowCatalog} from "./shows/catalogSlice";
import {getMovieCatalog} from "./movies/movieCatalogSlice";
import {getShowWanted} from "./shows/wantedListSlice";
import store from "../store";

export const updateAll = () => {
    store.dispatch(getShowQueue());
    store.dispatch(getShowHistory(30));
    store.dispatch(getShowCalendar(7));
    store.dispatch(getShowCatalog());
    store.dispatch(getShowWanted());
    store.dispatch(getMovieCatalog());
};

export const updateShowQueue = () => {
    store.dispatch(getShowQueue());
};

export const updateShows = () => {
    store.dispatch(getShowQueue());
    store.dispatch(getShowHistory(30));
    store.dispatch(getShowCalendar(7));
    store.dispatch(getShowCatalog());
    store.dispatch(getShowWanted());
};