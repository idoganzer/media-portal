import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getDataByType} from "../../utility/communication";
import parseResults from "../../utility/parseResults";

const initialState = {
    data: [],
    reqState: 'idle',
    error: {}
};

export const getMovieCatalog = createAsyncThunk(
    'catalog/movieCatalog',
    async () => {
        return getDataByType('movieCatalog').then(res => parseResults(res))
    }
)

const movieCatalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {},
    extraReducers: {
        [getMovieCatalog.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.reqState = 'success';
        },
        [getMovieCatalog.rejected]: (state, action) => {
            state.error = action.error;
            state.reqState = 'rejected';
        }
    }
});

export default movieCatalogSlice.reducer;