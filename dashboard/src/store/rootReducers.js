import ChatReducer from "./ChatReducer";
import AuthReducer from "./Reducers/AuthReducer";
import BannerReducer from "./Reducers/BannerReducer";
import CategoryReducer from "./Reducers/CategoryReducer";
import DashboardReducer from "./Reducers/DashboardReducer";
import OrderReducer from "./Reducers/OrderReducer";
import PaymentReducer from "./Reducers/PaymentReducer";
import ProductReducer from "./Reducers/ProductReducer";
import SellerReducer from "./Reducers/SellerReducer";

const rootReducer = {
  auth: AuthReducer,
  category: CategoryReducer,
  product: ProductReducer,
  seller: SellerReducer,
  chat: ChatReducer,
  order: OrderReducer,
  payment: PaymentReducer,
  dashboard: DashboardReducer,
  banner: BannerReducer,
};

export default rootReducer;
