import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./cart/cart.reducer";
import frequentlyPurchaseReducer from "./frequentlyPurchase/frequentlyPurchase.reducer";
import purchaseReducer from "./purchase/purchase.reducer";
import userReducer from "./user/user.reducer";
import recentlySeenReducer from "./recentlySeen/recentlySeen.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user", "purchase", "frequentlyPurchase", "recentlySeen"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  purchase: purchaseReducer,
  frequentlyPurchase: frequentlyPurchaseReducer,
  recentlySeen: recentlySeenReducer,
});

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default enhancedReducer;
