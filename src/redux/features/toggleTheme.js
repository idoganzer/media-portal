import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isDarkMode: true
};

const themeSelector = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggle: state => {
            state.isDarkMode = state.isDarkMode ? false : true;
        }
    }
})

export const { toggle } = themeSelector.actions;
export default themeSelector.reducer;