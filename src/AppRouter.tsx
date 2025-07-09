import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATH } from "@/constants/path";
import LandingPage from "@/pages/LandingPage";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      children: [
        {
          path: "",
          element: <LandingPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
