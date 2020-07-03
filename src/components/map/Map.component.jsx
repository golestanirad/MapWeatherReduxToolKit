import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import L from "leaflet";
import _ from "lodash";
import shortID from "shortid";
/// project fiels
import styles from "./Map.module.scss";
import { getWeather } from "../../redux/weatherSlice";
import { currentLocation } from "../../redux/mapSlice";
import MapMarker from "./marker/map-marker.component";

const Map = () => {
  /// Hooks
  const [zoom, setZoom] = useState(10);
  const dispatch = useDispatch();
  const { lat, lng } = useSelector((state) => state.map.currentLocation);
  const weatherLocations = useSelector(
    (state) => state.weather.weatherLocations
  );
  const favorites = useSelector((state) => state.weather.favorites);
  const visibleLocations = useSelector((state) => state.weather.visible);
  //// Handlers
  const handleContextMenu = (e) => {
    const {
      latlng: { lat, lng },
    } = e;
    dispatch(getWeather(lat, lng));
  };
  ///  Return
  return (
    <LeafletMap
      center={[lat, lng]}
      zoom={zoom}
      className={styles.container}
      onContextMenu={handleContextMenu}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      {_.map(weatherLocations, (location) => {
        if (visibleLocations.indexOf(location.locationName) >= 0)
          return (
            <MapMarker
              key={shortID.generate()}
              position={{
                lat: location.coord.lat,
                lng: location.coord.lng,
              }}
              temp={location.current.temp}
              type={
                favorites.indexOf(location.locationName) >= 0
                  ? "heart"
                  : "circle"
              }
            />
          );
      })}
    </LeafletMap>
  );
  // }
};

export default Map;
