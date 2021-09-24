import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getDataByType} from "../../utility/communication";
import parseResults from "../../utility/parseResults";

const initialState = {
    data: [],
    reqState: 'idle',
    error: {}
};

export const getShowWanted = createAsyncThunk(
    'wanted/showWanted',
    async () => {
        return getDataByType('showWanted').then(res => parseResults(res))
    }
);


const wantedSlice = createSlice({
    name: 'wanted',
    initialState,
    reducers: {},
    extraReducers: {
        [getShowWanted.pending]: (state, action) => {
            state.reqState = 'pending';
        },
        [getShowWanted.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.reqState = 'success';
        },
        [getShowWanted.rejected]: (state, action) => {
            state.error = action.error;
            state.reqState = 'rejected';
        }
    }
});

export default wantedSlice.reducer;