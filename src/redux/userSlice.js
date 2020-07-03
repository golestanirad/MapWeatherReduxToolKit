import { createSlice } from "@reduxjs/toolkit";
/// project files
import { auth, firestore, googleSignIn } from "../firebase/firebase.utils";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: { name: null, email: null, uid: null },
    isLoading: false,
    error: null,
  },

  reducers: {
    checkUserStatusStart(state, action) {
      state.isLoading = true;
    },
    checkUserStatusSuccess(state, action) {
      const { name, email, uid } = action.payload;
      state.userInfo = { name, email, uid };
      state.isLoading = false;
    },
    checkUserStatusFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginUserStart(state, action) {
      state.isLoading = true;
    },
    loginUserSuccess(state, action) {
      state.isLoading = false;
    },
    loginUserFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  checkUserStatusStart,
  checkUserStatusSuccess,
  checkUserStatusFailure,
  loginUserFailure,
  loginUserStart,
  loginUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;

//// Thunks
export const checkUserStatus = (user) => async (dispatch) => {
  try {
    dispatch(checkUserStatusStart());
    if (!user) {
      dispatch(checkUserStatusSuccess({ name: null, email: null, uid: null }));
      return;
    }
    const userRef = firestore.collection("users").doc(user.uid);
    if (!userRef.exists)
      await userRef.set({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      });
    dispatch(
      checkUserStatusSuccess({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      })
    );
  } catch (error) {
    console.log("error at login userrrrrrrr", error);
    dispatch(checkUserStatusFailure(error));
  }
};

export const loginUser = () => (dispatch) => {
  try {
    dispatch(loginUserStart());
    googleSignIn();
    dispatch(loginUserSuccess());
  } catch (error) {
    dispatch(loginUserFailure(error));
  }
};
