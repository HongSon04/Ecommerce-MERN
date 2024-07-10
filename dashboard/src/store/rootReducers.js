import ChatReducer from "./ChatReducer";
import AuthReducer from "./Reducers/AuthReducer";
import CategoryReducer from "./Reducers/CategoryReducer";
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
};

export default rootReducer;
