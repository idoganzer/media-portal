import {GET_SHOW_HISTORY, REQ_FAILED, REQ_PENDING, REQ_SUCCESSFUL} from "./actionTypes";
import { getDataByType } from "../../components/services/communication";
import parseResults from "../../components/services/parseResults";

const getShowHistory = range => dispatch => {
    dispatch({type: REQ_PENDING});

    getDataByType('showHistory', range)
        .then(res => dispatch({
            type: GET_SHOW_HISTORY,
            payload: parseResults(res)
        }))
        .then(() => dispatch({type: REQ_SUCCESSFUL}))
        .catch(err => dispatch({
            type: REQ_FAILED,
            payload: err
        }));
};
export default getShowHistory;

