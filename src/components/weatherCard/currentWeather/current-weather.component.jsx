import React from "react";
import _ from "lodash";
import moment from "moment-timezone";
/// project files
import styles from "./current-weather.module.scss";
import { converUnixTime } from "../../../utils/time";

const CurrentWeather = ({ location }) => {
  //// Props
  const { current, timezone } = location;
  const { dt, description, temp, icon } = current;
  ///// Helpers

  const time = converUnixTime(dt, timezone, "hh:mm A");
  ///// Return
  return (
    <div className={styles.container}>
      <span>{time}</span>
      <span>{description}</span>
      <div className={styles.iconAnddTemp}>
        <img
          className={styles.icon}
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather icon"
        />
        <span style={{ color: "black", fontSize: "30px" }}>
          {Math.round(temp)} &#8451;
        </span>
      </div>
    </div>
  );
};

export default CurrentWeather;
