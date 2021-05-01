import {GET_SHOW_CALENDAR, REQ_FAILED, REQ_PENDING, REQ_SUCCESSFUL} from "./actionTypes";
import { getDataByType } from "../../components/services/communication";
import parseResults from "../../components/services/parseResults";

const getShowCalendar = range => dispatch => {
    dispatch({type: REQ_PENDING});

    getDataByType('showCalendar', range)
        .then(res => dispatch({
            type: GET_SHOW_CALENDAR,
            payload: parseResults(res)
        }))
        .then(() => dispatch({type: REQ_SUCCESSFUL}))
        .catch(err => dispatch({
            type: REQ_FAILED,
            payload: err
        }));
};

export default getShowCalendar;