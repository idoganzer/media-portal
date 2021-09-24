import {getDataByType} from "../../utility/communication";
import parseResults from "../../utility/parseResults";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: [],
    reqState: 'idle',
    error: {}
};

export const getShowQueue = createAsyncThunk(
    'queue/showQueue',
    async () => {
        return getDataByType('downloadQueue').then(res => parseResults(res))
    }
)

const queueSlice = createSlice({
    name: 'queue',
    initialState,
    reducers: {},
    extraReducers: {
        [getShowQueue.pending]: (state, action) => {
            state.reqState = 'pending';
        },
        [getShowQueue.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.reqState = 'success';
        },
        [getShowQueue.rejected]: (state, action) => {
            state.error = action.error;
            state.reqState = 'rejected';
        }
    }
});

export default queueSlice.reducer;