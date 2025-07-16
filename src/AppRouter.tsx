import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATH } from "@/constants/path";
import ContentDetailPage from "@/pages/ContentDetailPage";
import HomePage from "@/pages/Home/HomePage";
import LandingPage from "@/pages/LandingPage";
import OnBoardingPage from "@/pages/OnBoardingPage";
import RedirectPage from "@/pages/RedirectPage";
import App from "./App";

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
        {
          path: PATH.ONBOARDING,
          element: <OnBoardingPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default AppRouter;
