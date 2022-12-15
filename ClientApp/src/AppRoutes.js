import { Counter } from "./components/Counter";
import {FetchData} from "./components/FetchData";
import { Home } from "./components/Home";
import Login from "./components/Login";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/login',
    element: <Login />
  }
];

export default AppRoutes;
