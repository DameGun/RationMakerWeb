import HomePage from "./HomePage";
import CrudPage from "./CrudPage";

const AppRoutes = [
  {
    index: true,
    element: <HomePage />
  },
  {
    path: "/crud",
    element: <CrudPage />
  }
];

export default AppRoutes;
