import React, { useRef, useEffect } from "react";
import _ from "lodash";
import shortId from "shortid";

//// project files
import WeatherCard from "../weatherCard/weather-card.component";
import styles from "./weather-card-list.module.scss";

const WeatherCardList = (props) => {
  ///Props

  const { locations } = props;
  // Hooks
  useEffect(() => {
    ref.current.scrollTo(0, 0);
  }, [Object.keys(locations).length]);
  //// Refs
  const ref = useRef();
  /// Return
  return (
    <div className={styles.container} ref={ref}>     
      {!_.isEmpty(locations) &&
        _.map(locations, (location, id) => (
          <WeatherCard
            location={location}
            locationID={id}
            key={shortId.generate()}
          />
        ))}
    </div>
  );
};

export default WeatherCardList;
