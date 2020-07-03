import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
/// project files
import styles from "./home.module.scss";
import TabBar from "../../components/tabBar/TabBar.component";
import SearchTab from "../../components/searchTab/Search-Tab.component";
import FavoriteTab from "../../components/favoriteTab/favorite-tab.component";
import { googleSignIn } from "../../firebase/firebase.utils";
import AgreeDialog from "../../components/dialogPopUp/agree-dialog.component";

const Home = () => {
  //// Hooks
  const userInfo = useSelector((state) => state.user.userInfo);

  const [showDialog, setShowDialog] = useState(false);

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
      <TabBar tabsNames={["Search", "Favorite"]} onClick={handleTabSelect}>
        <SearchTab />
        <FavoriteTab />
      </TabBar>
    </div>
  );
};

export default Home;
