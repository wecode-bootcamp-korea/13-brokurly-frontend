import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./cart/cart.reducer";
import userReducer from "./user/user.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default enhancedReducer;
