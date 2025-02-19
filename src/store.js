// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// 여행 관련 상태 slice
const travelSlice = createSlice({
    name: 'travel',
    initialState: {
        sharePlaceList: [],
        shareDistances: [],
    },
    reducers: {
        setsharePlaceList: (state, action) => {
            state.sharePlaceList = action.payload;
        },
        setShareDistances: (state, action) => {
            state.shareDistances = action.payload;
        },
    },
});

// 액션 내보내기
export const {setsharePlaceList, setShareDistances } =
    travelSlice.actions;

// 스토어 생성
const store = configureStore({
    reducer: {
        travel: travelSlice.reducer,
    },
});

export default store;
