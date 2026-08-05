import { Suspense, useState } from "react";
import { ACCESS_TOKEN } from "@lead-me/api/constants";
import AdminPage from "@/AdminPage";
import { Loading } from "@/AppFallbacks";
import AdminAuthCallback from "@/auth/AdminAuthCallback";
import AdminLoginPage from "@/auth/AdminLoginPage";

export const ADMIN_AUTH_CALLBACK_PATH = "/redirect/kakao";

const hasAdminSession = () => Boolean(sessionStorage.getItem(ACCESS_TOKEN));

const AdminApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAdminSession);

  if (window.location.pathname === ADMIN_AUTH_CALLBACK_PATH) {
    return (
      <AdminAuthCallback onAuthenticated={() => setIsAuthenticated(true)} />
    );
  }

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <AdminPage />
    </Suspense>
  );
};

export default AdminApp;
