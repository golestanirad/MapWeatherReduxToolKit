import React from "react";
import { useSelector, useDispatch } from "react-redux";
////// project fiels
import Map from "../map/Map.component";
import WeatherCardList from "../weatherCardList/weather-card-list.component";
import styles from "./Search-Tab.module.scss";
import SearchBox from "../searchBox/search-box.component";
import { auth, googleSignIn } from "../../firebase/firebase.utils";
import { restWholeData } from "../../redux/weatherSlice";
import ClockLoader from '../loaders/ClockLoader/clock-loader.component';

const SearchTab = () => {
  //// Hooks

  const dispatch = useDispatch();
  const weatherLocations = useSelector(
    (state) => state.weather.weatherLocations
  );
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLoading = useSelector((state) => state.weather.isLoading);
  ////Return
  return (
    <div className={styles.container}>
      1111{userInfo.name}222
      <button
        onClick={() => {
          auth.signOut();
          dispatch(restWholeData());
        }}
      >
        logout
      </button>
      <button onClick={googleSignIn}>login</button>
      <SearchBox />
      <Map />
      {isLoading && <ClockLoader />}
      <div className={styles.list}>
        <WeatherCardList locations={weatherLocations} />
      </div>
    </div>
  );
};

export default SearchTab;
