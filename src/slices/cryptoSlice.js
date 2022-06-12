import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    crypto: [],
    searchTerm: '',
    timePeriod: '7d',
    activeMenu: true,
    screenSize: null
};


const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        cryptoListChanged: (state, action) => {
            state.crypto = action.payload
        },
        cryptoSearchTermChanged: (state, action) => {
            state.searchTerm = action.payload
        },
        cryptoTimePeriodChanged: (state, action) => {
            state.timePeriod = action.payload
        },
        cryptoMenuToggle: (state, action) => {
            state.activeMenu = action.payload;
            // state.activeMenu = !state.activeMenu
        },
        cryptoSetScreenSize: (state, action) => {
            state.screenSize = action.payload
        }
    }
});

const {actions, reducer} = cryptoSlice;

export default reducer;

export const {
    cryptoListChanged,
    cryptoSearchTermChanged,
    cryptoTimePeriodChanged,
    cryptoMenuToggle,
    cryptoSetScreenSize
} = actions;