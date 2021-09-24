import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { getDataByType } from "../../utility/communication";
import parseResults from "../../utility/parseResults";

const initialState = {
    data: [],
    reqState: 'idle',
    error: {}
};

export const getShowCatalog = createAsyncThunk(
    'shows/showCatalog',
    async () => {
        return getDataByType('showCatalog').then(res => parseResults(res))
    }
);

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {},
    extraReducers: {
        [getShowCatalog.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.reqState = 'success';
        },
        [getShowCatalog.rejected]: (state, action) => {
            state.error = action.error;
            state.reqState = 'rejected'
        }
    }
});
export default catalogSlice.reducer;