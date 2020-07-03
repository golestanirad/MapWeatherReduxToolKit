import { createSlice } from "@reduxjs/toolkit";

const mapInitialState = {
  currentLocation: { lat: 49.2827, lng: -123.1207 },
};

const map = createSlice({
  name: "map",
  initialState: mapInitialState,
  reducers: {
    currentLocation(state, action) {
      state.currentLocation = action.payload;
    },
  },
});

export const { currentLocation } = map.actions;

export default map.reducer;
