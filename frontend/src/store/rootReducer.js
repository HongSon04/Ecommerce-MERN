import CartReducer from "./cartReducer";
import AuthReducer from "./reducers/AuthReducer";
import HomeReducer from "./reducers/HomeReducer";

const rootReducer = {
  home: HomeReducer,
  auth: AuthReducer,
  cart: CartReducer,
};

export default rootReducer;
