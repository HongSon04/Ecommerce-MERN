import CartReducer from "./cartReducer";
import DashboardReducer from "./DashboardReducer";
import OrderReducer from "./OrderReducer";
import AuthReducer from "./reducers/AuthReducer";
import HomeReducer from "./reducers/HomeReducer";

const rootReducer = {
  home: HomeReducer,
  auth: AuthReducer,
  cart: CartReducer,
  order: OrderReducer,
  dashboard: DashboardReducer,
};

export default rootReducer;
