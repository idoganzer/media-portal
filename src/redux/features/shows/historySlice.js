import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDataByType } from "../../utility/communication";
import parseResults from "../../utility/parseResults";

const initialState = {
    data: [],
    reqState: 'idle',
    error: {}
};

export const getShowHistory = createAsyncThunk(
    'history/showHistory',
    async range => {
        return getDataByType('showHistory', range).then(res => parseResults(res))
    }
);

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {},
    extraReducers: {
        [getShowHistory.pending]: (state, action) => {
            state.reqState = 'pending';
        },
        [getShowHistory.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.reqState = 'success';
        },
        [getShowHistory.rejected]: (state, action) => {
            state.error = action.error;
            state.reqState = 'rejected';
        }
    }
});

export default historySlice.reducer;