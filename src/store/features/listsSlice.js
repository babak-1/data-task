import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    remove: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    edit: (state, action) => {
      const { id, company, position, startDate, endDate } = action.payload;
      const cdata = state.find((list) => list.id == id);
      if (cdata) {
        cdata.company = company;
        cdata.position = position;
        cdata.startDate = startDate;
        cdata.endDate = endDate;
      }
    },
  },
});

export default listSlice.reducer;
export const { add, remove, edit } = listSlice.actions;
