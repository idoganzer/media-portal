import {GET_MOVIE_CATALOG, REQ_FAILED, REQ_PENDING, REQ_SUCCESSFUL} from "./actionTypes";
import {getDataByType} from "../../components/services/communication";
import parseResults from "../../components/services/parseResults";

const getMovieCatalog = () => dispatch => {
    dispatch({type: REQ_PENDING});

    getDataByType('movieCatalog')
        .then(res => dispatch({
            type: GET_MOVIE_CATALOG,
            payload: parseResults(res)
        }))
        .then(() => dispatch({type: REQ_SUCCESSFUL}))
        .catch(err => dispatch({
            type: REQ_FAILED,
            payload: err
        }));
};