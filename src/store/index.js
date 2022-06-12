import { configureStore } from "@reduxjs/toolkit";

import { cryptoApi } from "../api/cryptoApi";
import { cryptoNewsApi } from "../api/cryptoNewsApi";
import crypto from '../slices/cryptoSlice';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        crypto
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNewsApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});