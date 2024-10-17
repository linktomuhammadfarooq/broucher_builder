import "react-image-crop/dist/ReactCrop.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateDesign from "./components/CreateDesign";
import Home from "./components/Home";
import Layout from "./pages/Layout";
import Main from "./pages/Main";

const router = createBrowserRouter([
  {
    path: "/",
    // element: userInfo ? <Layout /> : <Index />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/design/create",
    element: <CreateDesign />,
    // element: userInfo ? <CreateDesign /> : <Navigate to="/" />,
  },
  {
    path: "/design/:design_id/edit",
    element: <Main />,
    // element: userInfo ? <Main /> : <Navigate to="/" />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
