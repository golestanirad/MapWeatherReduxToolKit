import React from "react";
import { useDispatch } from "react-redux";
import AlgoliaPlaces from "algolia-places-react";
//// project files
import styles from "./search-box.module.scss";
import { getWeather } from "../../redux/weatherSlice";
import { currentLocation } from "../../redux/mapSlice";

const SearchBox = () => {
  //// Hooks
  const dispatch = useDispatch();
  //// Handlers
  const handleLocationSelect = (e) => {  
    const { lat, lng } = e.suggestion.latlng;
    dispatch(getWeather(lat,lng));
    inputRef.setVal("");
  };
  //// Ref
  let inputRef = null;
  //// Return
  return (
    <div className={styles.container}>
      <AlgoliaPlaces
        className={styles.algolia}
        placeholder="Write a city name"
        options={{
          type: "city",
        }}
        onChange={handleLocationSelect}
        onLimit={(e) => console.log("onLimit", e)}
        onError={(e) => console.log("onError", e)}
        placesRef={(ref) => {
          inputRef = ref;
        }}
      />
    </div>
  );
};

export default SearchBox;
