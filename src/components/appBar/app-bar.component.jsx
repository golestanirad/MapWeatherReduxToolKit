import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Icon from "@material-ui/core/Icon";
///// project files
import styles from "./app-bar.module.scss";
import { toggleMap } from "../../redux/mapSlice";
import SidePanel from "../sidePanel/side-panel.component";

const AppBar = () => {
  /// Hooks
  const dispatch = useDispatch();
  

  ///// Helpers
  const onMapClick = () => {
    dispatch(toggleMap());
  };
  //// Return
  return (
    <div className={styles.container}>     
      <SidePanel />
      <Icon
        className={styles.icon}
        onClick={onMapClick}
        color="secondary"
        fontSize="large"
      >
        map
      </Icon>
    </div>
  );
};

export default AppBar;
