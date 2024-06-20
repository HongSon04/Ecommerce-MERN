import AuthReducer from "./Reducers/AuthReducer";
import CategoryReducer from "./Reducers/CategoryReducer";
import ProductReducer from "./Reducers/ProductReducer";

const rootReducer = {
  auth: AuthReducer,
  category: CategoryReducer,
  product: ProductReducer,
};

export default rootReducer;
