import { configureStore } from "@reduxjs/toolkit";
import listsSlice from "./features/listsSlice";

export const store = configureStore({
  reducer: {
    lists: listsSlice,
  },
});
