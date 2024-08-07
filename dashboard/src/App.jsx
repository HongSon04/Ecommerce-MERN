import { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { getRoutes } from "./router/routes";
import { useDispatch, useSelector } from "react-redux";
import { get_user_info } from "./store/Reducers/AuthReducer";

function App() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  useEffect(() => {
    if (token) {
      dispatch(get_user_info());
    } else {
      dispatch(get_user_info());
    }
  }, [token, dispatch]);

  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
  }, []);

  return <Router allRoutes={allRoutes} />;
}

export default App;
