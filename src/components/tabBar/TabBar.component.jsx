import React, {useRef} from "react";
import SwipeableViews from "react-swipeable-views";
import shortid from "shortid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SearchTab from "../../components/searchTab/Search-Tab.component";
import FavoriteTab from "../../components/favoriteTab/favorite-tab.component";

///// project files
import styles from "./TabBar.module.scss";
import SearchBox from "../searchBox/search-box.component";

const TabBar = ({ children, tabsNames, onClick }) => {
  /// Hooks
  const [value, setValue] = React.useState(0);
  /// Handlers
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  ///// Return
  return (
    <div className={styles.container}>
      <AppBar className={styles.appBar} position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {tabsNames.map((tabName) => (
            <Tab
              key={shortid.generate()}
              label={tabName}
              onClick={() => onClick?.(tabName)}
            />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews index={value} disabled className={styles.swipeableViews}>
        {children.map((child) => (
          <div key={shortid.generate()}>{child}</div>
        ))}
      </SwipeableViews>
    </div>
  );
};

export default TabBar;
