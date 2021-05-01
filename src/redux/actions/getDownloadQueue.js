import {GET_SHOW_QUEUE, REQ_PENDING, REQ_SUCCESSFUL, REQ_FAILED} from "./actionTypes";
import {getDataByType} from "../../components/services/communication";
import parseResults from "../../components/services/parseResults";

const getDownloadQueue = () => dispatch => {
    dispatch({type: REQ_PENDING});

    getDataByType('showQueue')
        .then(res => dispatch({
            type: GET_SHOW_QUEUE,
            payload: parseResults(res)
        }))
        .then(() => dispatch({type: REQ_SUCCESSFUL}))
        .catch(err => dispatch({
            type: REQ_FAILED,
            payload: err
        }));
};
export default getDownloadQueue;