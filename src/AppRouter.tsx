import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATH } from "@/constants/path";
import ContentDetailPage from "@/pages/ContentDetailPage";
import LandingPage from "@/pages/LandingPage";
import RedirectPage from "@/pages/RedirectPage";
import App from "./App";
import HomePage from "@/pages/HomePage";

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
          path: PATH.HOME, 
          element: <HomePage />, 
        },
        {
          path: PATH.CONTENT_DETAIL,
          element: <ContentDetailPage />,
        },
        {
          path: PATH.REDIRECT,
          element: <RedirectPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
