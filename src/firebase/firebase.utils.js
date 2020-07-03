import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/////// Set Up
const firebaseConfig = {
  apiKey: "AIzaSyCBn2ciVykGZ5jzImQj1qoPojQLYMMcXEI",
  authDomain: "map-weather-10531.firebaseapp.com",
  databaseURL: "https://map-weather-10531.firebaseio.com",
  projectId: "map-weather-10531",
  storageBucket: "map-weather-10531.appspot.com",
  messagingSenderId: "848134999340",
  appId: "1:848134999340:web:cebf58200aa623eebf7089",
  measurementId: "G-L04ENL8Z78",
};
firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({prompt: 'select_account'});   what does this do exactly
export const googleSignIn = () => firebase.auth().signInWithPopup(provider);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
////////  Methods
export const createUserProfileDocument = async (userAuth) => {
   
  try {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);  
    const userSnapShot = await userRef.get();
    if (!userSnapShot.exists)
      firestore
        .doc(`users/${userAuth.uid}`)
        .set({ name: userAuth.displayName });
    return userRef;
  } catch (error) {
    console.log(error);
  }
};
