import { createSlice } from "@reduxjs/toolkit";

const mapInitialState = {
  currentLocation: { lat: 49.2827, lng: -123.1207 },
  isMapShown: true,
};

const map = createSlice({
  name: "map",
  initialState: mapInitialState,
  reducers: {
    currentLocation(state, action) {
      state.currentLocation = action.payload;
    },
    toggleMap(state){
      state.isMapShown = !state.isMapShown
    }
  },
});

export const { currentLocation, toggleMap } = map.actions;

export default map.reducer;
