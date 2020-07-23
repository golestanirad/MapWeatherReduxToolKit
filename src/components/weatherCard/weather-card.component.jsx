import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@material-ui/core/Icon";
import _ from "lodash";
/// project files
import styles from "./weather-card.module.scss";
import {
  addToFavoriteList,
  removeFromFavoriteList,
  deleteLocation,
  addToVisibleLocations,
  removeFromVisibleLocations,
  addToExpandedCards,
  removeFromExpandedCards,
} from "../../redux/weatherSlice";
import CurrentWeather from "./currentWeather/current-weather.component";
import ForecastWeather from "./forecastWeather/forecast-weather.component";
import AgreeDialog from "../dialogPopUp/agree-dialog.component";
import { googleSignIn } from "../../firebase/firebase.utils";

const WeatherCard = (props) => {
  ///// Props
  const { location, locationID } = props;
  const { locationName } = location;
console.log(6666666666,locationName)
  //// Hooks
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.weather.favorites);
  const userInfo = useSelector((state) => state.user.userInfo);
  const shouldBeVisible = useSelector((state) =>
    state.weather.visible.includes(locationID)
  );
  const isExpanded = useSelector((state) =>
    state.weather.expanded.includes(locationID)
  );

  const [showDialog, setShowDialog] = useState(false);

  //// Handlers
  const handleFavoriteClick = () => {
    if (!userInfo.name) {
      setShowDialog(true);
    } else {
      if (favorites.indexOf(locationID) < 0)
        dispatch(addToFavoriteList(userInfo.uid, location));
      else dispatch(removeFromFavoriteList(userInfo.uid, location));
    }
  };

  const handleVisibility = () => {
    if (shouldBeVisible) {
      dispatch(removeFromVisibleLocations(locationID));
    } else {
      dispatch(addToVisibleLocations(locationID));
    }
  };

  const handleExpanding = () => {
    if (isExpanded) {
      dispatch(removeFromExpandedCards(locationID));
    } else {
      dispatch(addToExpandedCards(locationID));
    }
  };

  const handleDeleteClick = () => {
    dispatch(deleteLocation(locationID));
  };

  const handleAgree = () => {
    setShowDialog(false);
    googleSignIn().then((result) => {
      console.log("result", result);

      if (!favorites.includes(locationID)) {
        console.log("result.user.uid", result.user.uid);
        console.log("location", location);
        dispatch(addToFavoriteList(result.user.uid, location));
      } else {
        dispatch(removeFromFavoriteList(result.user.uid, location));
      }
    });
  };
  const handleDisagree = () => {
    setShowDialog(false);
  };
  ///// Return
  return (
    <div className={styles.container}>
      <AgreeDialog
        showDialog={showDialog}
        handleAgree={handleAgree}
        handleDisagree={handleDisagree}
        title={" Would you like to login with your Google account?"}
        content={
          "In order to save your favorites you need to login so we can save them for you :)"
        }
      />
      <div className={styles.bar}>
        <Icon
          className={styles.icon}
          onClick={handleVisibility}
          color="primary"
        >
          {shouldBeVisible ? "visibility_on" : "visibility_off"}
        </Icon>
        <Icon className={styles.icon} onClick={handleExpanding} color="primary">
          {isExpanded ? "expand_more" : "expand_less"}
        </Icon>
        <span className={styles.name}>{locationName}</span>
        <Icon
          className={styles.icon}
          onClick={handleFavoriteClick}
          color="secondary"
        >
          {favorites.indexOf(locationID) >= 0 ? "favorite" : "favorite_border"}
        </Icon>
        <Icon className={styles.icon} onClick={handleDeleteClick}>
          close
        </Icon>
      </div>
      {isExpanded && (
        <>
          <CurrentWeather location={location} />
          <ForecastWeather location={location} />
        </>
      )}
    </div>
  );
};

export default WeatherCard;
