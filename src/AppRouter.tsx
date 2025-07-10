import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATH } from "@/constants/path";
import App from "./App";
import ContentDetailPage from "@/pages/ContentDetailPage";
import LandingPage from "@/pages/LandingPage";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <App />,
      children: [
        {
          path: "",
          element: <LandingPage />,
        },
        {
          path: PATH.CONTENT_DETAIL,
          element: <ContentDetailPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
