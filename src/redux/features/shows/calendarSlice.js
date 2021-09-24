import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDataByType } from "../../utility/communication";
import parseResults from "../../utility/parseResults";

const initialState = {
    data: [],
    reqState: 'idle',
    error: {}
};

export const getShowCalendar = createAsyncThunk(
    'calendar/showCalendar',
    async range => {
        return getDataByType('showCalendar', range).then(res => parseResults(res))
    }
);

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {},
    extraReducers: {
        [getShowCalendar.pending]: (state, action) => {
            state.reqState = 'pending';
        },
        [getShowCalendar.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.reqState = 'success';
        },
        [getShowCalendar.rejected]: (state, action) => {
            state.error = action.error;
            state.reqState = 'rejected'
        }
    }
});

export default calendarSlice.reducer;