import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { PATH } from "@/constants/path";
import * as Lazy from "./lazy";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <App />,
      children: [
        {
          path: "",
          element: (
            <Suspense>
              <Lazy.LandingPage />
            </Suspense>
          ),
        },
        {
          path: PATH.HOME,
          element: (
            <Suspense>
              <Lazy.HomePage />
            </Suspense>
          ),
        },
        {
          path: PATH.CONTENT_DETAIL,
          element: (
            <Suspense>
              <Lazy.ContentDetailPage />
            </Suspense>
          ),
        },
        {
          path: PATH.SHORTS,
          element: (
            <Suspense>
              <Lazy.ShortsPage />
            </Suspense>
          ),
        },
        {
          path: PATH.REDIRECT,
          element: (
            <Suspense>
              <Lazy.RedirectPage />
            </Suspense>
          ),
        },
        {
          path: PATH.ONBOARDING,
          element: (
            <Suspense>
              <Lazy.OnBoardingPage />
            </Suspense>
          ),
        },
        {
          path: PATH.MYPAGE,
          element: (
            <Suspense>
              <Lazy.MyPage />
            </Suspense>
          ),
        },
        {
          path: PATH.SEARCH,
          element: (
            <Suspense>
              <Lazy.SearchPage />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: (
            <Suspense>
              <Lazy.NotFoundPage />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
