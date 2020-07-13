import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//// project files
import "./App.css";
import Home from "./pages/home/home.component";
import About from "./pages/about/about.component";
import { currentLocation } from "./redux/mapSlice";
import { getWeather, initialFavoritesFetch } from "./redux/weatherSlice";
import { checkUserStatus } from "./redux/userSlice";
import { auth } from "./firebase/firebase.utils";
import { fetchFavoriteLocations } from "./api/weatherAPI";

const App = () => {
  //// Hooks
  const dispatch = useDispatch();

  const uid = useSelector((state) => state.user.userInfo.uid);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        dispatch(currentLocation({ lat: latitude, lng: longitude }));
        dispatch(getWeather(latitude, longitude));
      }
    );
  }, []);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      dispatch(checkUserStatus(user));
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  useEffect(() => {
    dispatch(initialFavoritesFetch(uid));
  }, [uid]);

  /// Return
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

////  1) add map - DONE
//// 2) weather icons - DONE
//// 3) make a list of search location under the map instead of only one card - DONE
//// 4) add search input - DONE
//// 5) add favorite list and icon - DONE
///// 6) add favorite - DONE
////  7) add loading - DONE
////// 8) move scroll to the top after adding to the list - DONE
//// 9) keep the last location on map - DONE
/// 10) pin locations on the map with temperature on the pin - DONE
///// 11) handle error (for instance, city not found)
/////  12) customize pins on map - DONE
///// 13  BUG , making favorite will jump the list to teh top  - DONE
///14) read favorite from main list - DONE
///// 15) set my corrent location at start - DONE
///// 16)  make not favorite one as a circle on the map - DONE
//// 17) remove cards capability - DONE
/////18 ) BUG  when using search box, the mao marker is very off - DONE
//// 19) add weather forcats ;) - DONE
//// 20)  click on a more icon on a card and then get all the data in a popup
//// 21) add login attempt for favorite sections - DONE
//// 22) add favorite to firestore - DONE
///// 23) BUG make sure deleting a favorite item won't affect its being-favorite and if its back it should still be favorite - DONE
//// 24) remove favorite from firestore - DONE
///// 25) fetch user favorites after loggin in - DONE
//// 26) add display-eye icon instead of deleteing - DONE
//// 27) BUG - after logging in, the  slected location won't turn into favorite - DONE
//// BUG 28)  after adding a new one all colapsed ones will open again - DONE
///// 29) remove libs that you don't need
///// 30) go on react-native 
////// 31) change time to 2am, 8pm - DONE
////// 32) yellow = no rain, blue rainny - DONE
////// 33) remove 12am to 6am ........
