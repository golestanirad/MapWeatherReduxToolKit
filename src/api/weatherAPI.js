import axios from "axios";
/// project files
import { firestore } from "../firebase/firebase.utils";

export const fetchCurrentWeather = (lat, lng) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=b3e4ac819a75b7e1ffe53d3d5701cc90&units=metric`;
    const promise = axios.get(url);
    return promise;
  } catch (error) {
    console.log("errrorrrrr", error);
  }
};

export const fetchForecastWeather = (lat, lng) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=b3e4ac819a75b7e1ffe53d3d5701cc90&units=metric`;
    const promise = axios.get(url);
    return promise;
  } catch (error) {
    console.log("errrorrrrr", error);
  }
};

export const fetchFavoriteLocations = (uid) => {
  try {
    const promise = firestore
      .collection("users")
      .doc(uid)
      .collection("favorites")
      .get();  
    return promise;
  } catch (error) {
    console.log("errorrrrrr", error);
  }
};

export const setFavoriteLocation = (uid, location) => {
  try {
    const { locationName, coord } = location;
    firestore
      .collection("users")
      .doc(uid)
      .collection("favorites")
      .doc(locationName)
      .set({ ...coord });
  } catch (error) {
    console.log("setFavoriteLocation - error: ", error);
  }
};

export const deleteFavoriteLocation = (uid, location) => {
  const { locationName } = location;
  const promise = firestore
    .collection("users")
    .doc(uid)
    .collection("favorites")
    .doc(locationName)
    .delete();
  return promise;
};

export const fetchBatchWeatherLocations = async (locationsLatLng) => {
  try {
    const promises = locationsLatLng.map(({ lat, lng }) => ({
      current: fetchCurrentWeather(lat, lng),
      forecast: fetchForecastWeather(lat, lng),
    }));

    const results = await Promise.all(
      promises.map(({ current, forecast }) =>
        Promise.all([current, forecast]).then(([current, forecast]) => ({
          current: current.data,
          forecast: forecast.data,
        }))
      )
    );
    return results;
  } catch (error) {
    return error;
  }
};
