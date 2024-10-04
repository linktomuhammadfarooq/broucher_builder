import "react-image-crop/dist/ReactCrop.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import CreateDesign from "./components/CreateDesign";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Templates from "./components/Templates";
import Index from "./pages/Index";
import Layout from "./pages/Layout";
import Main from "./pages/Main";
import { token_decode } from "./utils/index";

const userInfo = token_decode(localStorage.getItem("canva_token"));

const router = createBrowserRouter([
  {
    path: "/",
    element: userInfo ? <Layout /> : <Index />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/templates",
        element: <Templates />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
    ],
  },
  {
    path: "/design/create",
    element: userInfo ? <CreateDesign /> : <Navigate to="/" />,
  },
  {
    path: "/design/:design_id/edit",
    element: userInfo ? <Main /> : <Navigate to="/" />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
