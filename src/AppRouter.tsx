import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATH } from "@/constants/path";
import ContentDetailPage from "@/pages/ContentDetailPage";
import App from "./App";
import HomeLayout from "./components/Home/HomeLayout";
import HomePage from "./pages/Home/HomePage";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <App />,
      children: [
        {
          element: <HomeLayout />,
          children: [
            {
              path: "",
              element: <HomePage />,
            },
          ],
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
