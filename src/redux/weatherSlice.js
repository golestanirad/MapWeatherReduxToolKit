import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
/// project files
import {
  fetchForecastWeather,
  fetchCurrentWeather,
  setFavoriteLocation,
  deleteFavoriteLocation,
  fetchFavoriteLocations,
  fetchBatchWeatherLocations,
} from "../api/weatherAPI";

/*
weatherLocations: {
  Yerevan - AM: {
    timezone: 14400,
    locationName: "Yerevan - AM",
    coord; {lat:44,lng:48},
    current:{
      temp: 15,
      icon: "01n",
      dt: 1590519569,
      description: "scattered clouds"
    }, 
    forcase: [
      {
        dt:1590526800,
        temp: 14.93,
        icon: "01n",
        description:"scattered clouds"
      },
      ...
    ],
  },
  ...
}
*/
const locationsInitialState = {
  weatherLocations: {},
  favorites: [],
  visible: [],
  expanded: [],
  isLoading: false,
  error: null,
};

const weather = createSlice({
  name: "weather",
  initialState: locationsInitialState,
  reducers: {
    getWeatherStart(state, action) {
      state.isLoading = true;
    },
    getWeatherSuccess(state, action) {
      state.weatherLocations = {
        ...action.payload,
        ...state.weatherLocations,
      };
      const locationName = Object.keys(action.payload)[0];
      if (!state.visible.includes(locationName)) {
        state.visible.push(locationName);
      }
      if (!state.expanded.includes(locationName)) {
        state.expanded.push(locationName);
      }
      state.isLoading = false;
      state.error = null;
    },
    getWeatherFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    ///////
    addToFavoriteListSuccess(state, action) {
      state.favorites.push(action.payload);
      state.isLoading = false;
    },
    addToFavoriteListFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    ///////
    removeFromFavoriteListSuccess(state, action) {
      state.favorites = _.without(state.favorites, action.payload);
    },
    removeFromFavoriteListFailure(state, action) {
      state.error = action.payload;
    },
    //////////
    deleteLocation(state, action) {
      delete state.weatherLocations[action.payload];
    },
    ////////
    initialFavoritesFetchStart(state, action) {
      state.isLoading = true;
    },
    initialFavoritesFetchSuccess(state, action) {
      state.isLoading = false;     
      if (Object.keys(action.payload).length > 0) {
        state.weatherLocations = {
          ...state.weatherLocations,
          ...action.payload,
        };
        state.favorites = Object.keys(action.payload);

        const locationsName = Object.keys(action.payload);
        locationsName.map((locationName) => {
          if (!state.visible.includes(locationName)) {
            state.visible.push(locationName);
          }
          if (!state.expanded.includes(locationName)) {
            state.expanded.push(locationName);
          }
        });
      }
    },
    initialFavoritesFetchFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    //////////
    addToVisibleLocations(state, action) {
      state.visible.push(action.payload);
    },
    removeFromVisibleLocations(state, action) {
      state.visible = _.without(state.visible, action.payload);
    },
    //////////
    addToExpandedCards(state, action) {
      state.expanded.push(action.payload);
    },
    removeFromExpandedCards(state, action) {
      state.expanded = _.without(state.expanded, action.payload);
    },
    ///////
    restWholeData(state) {
      state.weatherLocations = {};
      state.favorites = [];
      state.visible = [];
    },
    /////////
  },
});

export const {
  getWeatherStart,
  getWeatherSuccess,
  getWeatherFailure,
  addToFavoriteListSuccess,
  addToFavoriteListFailure,
  removeFromFavoriteListSuccess,
  removeFromFavoriteListFailure,
  deleteLocation,
  initialFavoritesFetchStart,
  initialFavoritesFetchSuccess,
  initialFavoritesFetchFailure,
  addToVisibleLocations,
  removeFromVisibleLocations,
  restWholeData,
  addToExpandedCards,
  removeFromExpandedCards,
} = weather.actions;

export default weather.reducer;

///// Thunks

export const getWeather = (lat, lng) => async (dispatch) => {
  try {
    dispatch(getWeatherStart());
    const result = await Promise.all([
      fetchCurrentWeather(lat, lng),
      fetchForecastWeather(lat, lng),
    ]);
    const current = result[0].data;
    const forecast = result[1].data;
    const weatherData = makeWeatherData(current, forecast);
    dispatch(getWeatherSuccess(weatherData));
  } catch (error) {
    console.log("getWeather errorrrrrrr", error);
    dispatch(getWeatherFailure(error));
  }
};

export const addToFavoriteList = (uid, location) => async (dispatch) => {
  try {
    const { locationName } = location;
    setFavoriteLocation(uid, location);
    dispatch(addToFavoriteListSuccess(locationName));
  } catch (error) {
    console.log("addToFavoriteList errorrrrrrr", error);
    dispatch(addToFavoriteListFailure(error));
  }
};

export const removeFromFavoriteList = (uid, location) => async (dispatch) => {
  try {
    const { locationName } = location;
    await deleteFavoriteLocation(uid, location);
    dispatch(removeFromFavoriteListSuccess(locationName));
  } catch (error) {}
};

export const initialFavoritesFetch = (uid) => async (dispatch) => {
  try {
    if (uid) {
      dispatch(initialFavoritesFetchStart());
      const favoriteLocationsLatLng = [];
      const favoriteLocationsSnapshot = await fetchFavoriteLocations(uid);
      favoriteLocationsSnapshot.forEach((doc) => {
        favoriteLocationsLatLng.push(doc.data());
      });
      const weatherOfFavoriteLocations = await fetchBatchWeatherLocations(
        favoriteLocationsLatLng
      );

      const finalWeatherDataForFavoriteLocations = {};
      if (weatherOfFavoriteLocations.length > 0) {
        weatherOfFavoriteLocations.forEach(({ current, forecast }) => {
          const weatherData = makeWeatherData(current, forecast);
          Object.assign(finalWeatherDataForFavoriteLocations, weatherData);
        });
      }
      dispatch(
        initialFavoritesFetchSuccess(finalWeatherDataForFavoriteLocations)
      );
    } else {
      ///
    }
  } catch (error) {
    console.log("initialFavoritesFetch errorrrrrrr", error);
    dispatch(initialFavoritesFetchFailure(error));
  }
};

//// Helpers
const makeWeatherData = (current, forecast) => {
  const { city, list } = forecast;
  const { main, weather, dt, coord } = current;
  const weatherData = {
    [city.name + " - " + city.country]: {
      timezone: city.timezone,
      locationName: city.name + " - " + city.country,
      coord: { lat: coord.lat, lng: coord.lon },
      current: {
        temp: main.temp,
        icon: weather[0].icon,
        dt,
        description: weather[0].description,
      },
      forecast: list.map(({ main, weather, dt }) => {
        return {
          temp: main.temp,
          icon: weather[0].icon,
          dt,
          description: weather[0].description,
        };
      }),
    },
  };
  return weatherData;
};
