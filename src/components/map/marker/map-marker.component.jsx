import React from "react";
import ReactDOMServer from "react-dom/server";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
/// project files
import styles from "./map-marker.module.scss";
import HeartIcon from "../icons/heartIcon/heart-icon.component";
import CircleIcon from "../icons/circleIcon/circle-icon.component";

const MapMarker = (props) => {
  //// Props
  const { position,temp, type } = props;


  //// Return

  const icons = {
    heart: HeartIcon,
    circle: CircleIcon,
  };
  const SelectedIcon = icons[type];

  const icon = L.divIcon({
    html: ReactDOMServer.renderToString(<SelectedIcon temp={temp} />),
  });

  return <Marker position={position} icon={icon} />;
};

export default MapMarker;
