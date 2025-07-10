import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { PATH } from "@/constants/path";
import ContentDetailPage from "@/pages/ContentDetailPage";
import LandingPage from "@/pages/LandingPage";
import ShortsPage from "./pages/ShortsPage";

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
        {
          path: PATH.SHORTS,
          element: <ShortsPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
