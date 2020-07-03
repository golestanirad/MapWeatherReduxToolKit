import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
///// project files
import styles from "./favorite-tab.module.scss";
import WeatherCardList from "../weatherCardList/weather-card-list.component";

const FavoriteTab = () => {
  ////Hooks
  const favorites = useSelector((state) => {
    const { favorites, weatherLocations } = state.weather;
    const favoriteWeatherData = {};
    favorites.forEach(
      (favorite) =>
        weatherLocations[favorite] &&
        (favoriteWeatherData[favorite] = weatherLocations[favorite])
    );
    return favoriteWeatherData;
  });

  ///// Return
  return (
    <div className={styles.container}>
      <WeatherCardList locations={favorites} />
    </div>
  );
};

export default FavoriteTab;
