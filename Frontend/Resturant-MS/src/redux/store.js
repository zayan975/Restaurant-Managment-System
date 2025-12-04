import { configureStore } from "@reduxjs/toolkit";
import customerSlices from './slices/customerSlices'

const store = configureStore({
    reducer: {
        customer: customerSlices
    },
    devTools: import.meta.env.NODE_ENV !== "production"
});

export default store;