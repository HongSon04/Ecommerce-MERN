import ChatReducer from "./ChatReducer";
import AuthReducer from "./Reducers/AuthReducer";
import CategoryReducer from "./Reducers/CategoryReducer";
import OrderReducer from "./Reducers/OrderReducer";
import ProductReducer from "./Reducers/ProductReducer";
import SellerReducer from "./Reducers/SellerReducer";

const rootReducer = {
  auth: AuthReducer,
  category: CategoryReducer,
  product: ProductReducer,
  seller: SellerReducer,
  chat: ChatReducer,
  order: OrderReducer,
};

export default rootReducer;
