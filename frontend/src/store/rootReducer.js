import CartReducer from "./cartReducer";
import DashboardReducer from "./DashboardReducer";
import OrderReducer from "./OrderReducer";
import AuthReducer from "./reducers/AuthReducer";
import ChatReducer from "./reducers/ChatReducer";
import HomeReducer from "./reducers/HomeReducer";

const rootReducer = {
  home: HomeReducer,
  auth: AuthReducer,
  cart: CartReducer,
  order: OrderReducer,
  dashboard: DashboardReducer,
  chat: ChatReducer,
};

export default rootReducer;
