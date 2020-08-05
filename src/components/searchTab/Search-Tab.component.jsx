import React from "react";
import { useSelector, useDispatch } from "react-redux";
////// project fiels
import Map from "../map/Map.component";
import WeatherCardList from "../weatherCardList/weather-card-list.component";
import styles from "./Search-Tab.module.scss";
import SearchBox from "../searchBox/search-box.component";
import { auth, googleSignIn } from "../../firebase/firebase.utils";
import { restWholeData } from "../../redux/weatherSlice";
import ClockLoader from "../loaders/ClockLoader/clock-loader.component";
import { showMap } from "../../redux/mapSlice"; 


const SearchTab = () => {
  //// Hooks
  const dispatch = useDispatch();
  const weatherLocations = useSelector(
    (state) => state.weather.weatherLocations
  );
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLoading = useSelector((state) => state.weather.isLoading);
  const isMapShown = useSelector((state) => state.map.isMapShown);
  ////Return
  return (
    <div className={styles.container}>
      {/* 1111{userInfo.name}222
      <button
        onClick={() => {
          auth.signOut();
          dispatch(restWholeData());
        }}
      >
        logout
      </button>
      <button onClick={googleSignIn}>login</button> */}
      <div className={styles.searchBox}>
        <SearchBox />
      </div>
      {isMapShown && (
        <div className={styles.map}>
          <Map />
        </div>
      )}
      {isLoading && <ClockLoader />}
      <div className={isMapShown ? styles.listWithMap : styles.listWithoutMap}>
        {/* {array.map((test) => (
          <>
            <div>{test}</div>
            <br />
            <br />
            <br />
            <br />
            
          </>
        ))}
        :)) */}
        <WeatherCardList locations={weatherLocations} />
      </div>
    </div>
  );
};

export default SearchTab;
const array = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
];
