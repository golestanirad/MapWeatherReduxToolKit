import React from "react";
//// project files
import styles from "./forecast-card.module.scss";

const ForecastCard = (props) => {
  /// Props
  const { icon, temp, timeOfDay } = props;
  /// Return
  return (
    <div className={styles.container} >
      <span>{timeOfDay}</span>
      <span>{temp}</span>

      <img
        className={styles.icon}      
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
      />
    </div>
  );
};

export default ForecastCard;
