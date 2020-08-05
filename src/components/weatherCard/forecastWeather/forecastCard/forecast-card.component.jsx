import React from "react";
//// project files
import styles from "./forecast-card.module.scss";

const ForecastCard = (props) => {
  /// Props
  const { icon, temp, timeOfDay, description } = props;
  var noneSunnyWordsReg = /(Snow|Rain|Drizzle|Thunderstorm|Sleet)/i;
  const isRainy = noneSunnyWordsReg.test(description);
  /// Return
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: isRainy ? "lightBlue" : "#f6f467" }}
    >
      <span>{timeOfDay}</span>
      <span className={styles.temp}>{temp} &#8451;</span>

      <img
        className={styles.icon}
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
      />
    </div>
  );
};

export default ForecastCard;
