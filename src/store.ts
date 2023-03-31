/* eslint-disable @typescript-eslint/no-unused-vars */
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { availnftmodalOpenReducer } from "./redux/reducers/availnftmodalOpen";
import { modalOpenReducer } from "./redux/reducers/modalOpenReducer";
import { perksModalOpenReducer } from "./redux/reducers/perkModalOpenReducer";
import { uploadBtnReducer } from "./redux/reducers/uploadBtnReducers";
import { configureStore } from "@reduxjs/toolkit";
import userData from "./redux/slices/userData";
import { uploadnftmodalOpenReducer } from "./redux/reducers/uploadnftmodalOpenReducer";

const reducers = combineReducers({
  uploadBtn: uploadBtnReducer,
  userData,
  modalOpen: modalOpenReducer,
  perksModalOpen: perksModalOpenReducer,
  uploadnftModalOpen: uploadnftmodalOpenReducer,
  availnftModalOpen: availnftmodalOpenReducer,
});

const middleware = [thunk];

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootStore = ReturnType<typeof reducers>;
