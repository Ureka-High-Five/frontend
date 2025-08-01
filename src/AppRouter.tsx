import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { PATH } from "@/constants/path";
import ContentDetailPage from "@/pages/ContentDetailPage";
import HomePage from "@/pages/HomePage";
import LandingPage from "@/pages/LandingPage";
import MyPage from "@/pages/MyPage";
import OnBoardingPage from "@/pages/OnBoardingPage";
import RedirectPage from "@/pages/RedirectPage";
import AdminPage from "./pages/AdminPage";
import SearchPage from "./pages/SearchPage";
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
          path: PATH.HOME,
          element: <HomePage />,
        },
        {
          path: PATH.CONTENT_DETAIL,
          element: <ContentDetailPage />,
        },
        {
          path: PATH.SHORTS,
          element: <ShortsPage />,
        },
        {
          path: PATH.REDIRECT,
          element: <RedirectPage />,
        },
        {
          path: PATH.ONBOARDING,
          element: <OnBoardingPage />,
        },
        {
          path: PATH.MYPAGE,
          element: <MyPage />,
        },
        { path: PATH.SEARCH, element: <SearchPage /> },
      ],
    },
    {
      path: PATH.ADMIN,
      element: <AdminPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};
export default AppRouter;
