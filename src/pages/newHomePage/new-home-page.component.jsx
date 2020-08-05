import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
/// project files
import styles from "./new-home-page.module.scss";
import AgreeDialog from "../../components/dialogPopUp/agree-dialog.component";
import SearchBox from "../../components/searchBox/search-box.component";
import { auth, googleSignIn } from "../../firebase/firebase.utils";
import { restWholeData } from "../../redux/weatherSlice";
import ClockLoader from "../../components/loaders/ClockLoader/clock-loader.component";
import { showMap } from "../../redux/mapSlice";
import Map from "../../components/map/Map.component";
import WeatherCardList from "../../components/weatherCardList/weather-card-list.component";

const NewHomePage = () => {
  //// Hooks
  const userInfo = useSelector((state) => state.user.userInfo);
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();
  const weatherLocations = useSelector(
    (state) => state.weather.weatherLocations
  );
  const isLoading = useSelector((state) => state.weather.isLoading);
  const isMapShown = useSelector((state) => state.map.isMapShown);

  //// Handlers
  const handleAgree = () => {
    setShowDialog(false);
    googleSignIn();
  };

  const handleDisagree = () => {
    setShowDialog(false);
  };
  //// Handlers
  const handleTabSelect = (tabName) => {
    if (tabName === "Favorite" && !userInfo.name) {
      setShowDialog(true);
    }
  };

  //// Return
  return (
    <div className={styles.container}>
      <AgreeDialog
        showDialog={showDialog}
        handleAgree={handleAgree}
        handleDisagree={handleDisagree}
        title={"Would you like to login with your Google account?"}
        content={
          "In order to see your favorites you need to login so we can find your list :)"
        }
      />

      {/* <SearchTab /> */}
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
        <div
          className={isMapShown ? styles.listWithMap : styles.listWithoutMap}
        >
          <WeatherCardList locations={weatherLocations} />
        </div>
      </div>
    </div>
  );
};

export default NewHomePage;
