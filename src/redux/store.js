import { configureStore } from "@reduxjs/toolkit";
/// project files
import rootReducer from "./rootReducer";

export default configureStore({
  reducer: rootReducer,
});
