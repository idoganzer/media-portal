import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {postCommand} from "../../utility/communication";
import {updateShows} from "../update";

const initialState = {
    data: [],
    reqState: 'idle',
    error: {}
};

export const postSonarrCommand = createAsyncThunk(
    'sonarr/command',
    async type => {
        return postCommand(type).then(res => {
            updateShows();
            return res
        })
    }
);

const sonarrCommandSlice = createSlice({
    name: 'sonarr',
    initialState,
    reducers: {},
    extraReducers: {
        [postSonarrCommand.pending]: (state, action) => {
            state.reqState = 'pending';
        },
        [postSonarrCommand.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.reqState = 'success';
        },
        [postSonarrCommand.rejected]: (state, action) => {
            state.error = action.error;
            state.reqState = 'rejected'
        }
    }
});

export default sonarrCommandSlice.reducer;