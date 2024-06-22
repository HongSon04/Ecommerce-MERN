import AuthReducer from "./Reducers/AuthReducer";
import CategoryReducer from "./Reducers/CategoryReducer";
import ProductReducer from "./Reducers/ProductReducer";
import SellerReducer from "./Reducers/SellerReducer";

const rootReducer = {
  auth: AuthReducer,
  category: CategoryReducer,
  product: ProductReducer,
  seller: SellerReducer,
};

export default rootReducer;
