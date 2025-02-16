import { configureStore } from "@reduxjs/toolkit";
import markdownReducer from "./markdownslice";

export const store = configureStore({
  reducer: {
    markdown: markdownReducer,
  },
});