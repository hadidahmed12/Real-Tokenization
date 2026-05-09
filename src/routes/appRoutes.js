// import Dashboard from "../pages/Dashboard";
import Dashboard from "../pages/Dashboard";
import Transaction from "../pages/Transaction";
import { browserRoutes } from "./browserRoutes";

export const appRoutes = [
  {
    id: 1,
    path: browserRoutes.DASHBOARD,
    element: <Dashboard />,
  },
  {
    id: 2,
    path: browserRoutes.TRANSACTION,
    element: <Transaction />,
  },
];
