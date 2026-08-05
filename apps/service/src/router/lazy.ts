import { lazy } from "react";

export const LandingPage = lazy(() => import("@/pages/LandingPage"));
export const HomePage = lazy(() => import("@/pages/HomePage"));
export const ContentDetailPage = lazy(
  () => import("@/pages/ContentDetailPage")
);
export const ShortsPage = lazy(() => import("@/pages/ShortsPage"));
export const RedirectPage = lazy(() => import("@/pages/RedirectPage"));
export const OnBoardingPage = lazy(() => import("@/pages/OnBoardingPage"));
export const MyPage = lazy(() => import("@/pages/MyPage"));
export const SearchPage = lazy(() => import("@/pages/SearchPage"));
export const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
