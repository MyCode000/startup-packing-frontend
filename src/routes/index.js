import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// paths
import { PATH_AUTH, PATH_SITE } from "./paths";
// layout
import SiteLayout from "../Layouts/SiteLayout";
import Layout from "../Layouts/layout";
import LoadingScreen from "../Components/loadingScreen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // Redirect from root to /auth/signin
    {
      path: "/",
      element: <Navigate to={PATH_SITE.home} replace />,
    },
    // Site
    {
      path: "/",
      element: <SiteLayout />,
      children: [{ path: PATH_SITE.home, element: <HomePage /> }],
    },
    //Auth
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: PATH_AUTH.login, element: <LoginPage /> },
        { path: PATH_AUTH.signUp, element: <SignupPage /> },
      ],
    },
    {
      path: "*",
      element: <Layout />,
      children: [
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
//overview
// -- Home
const HomePage = Loadable(lazy(() => import("../Pages/HomePage")));

// auth
// -- Login
const LoginPage = Loadable(lazy(() => import("../Pages/LoginPage")));
// -- Signup
const SignupPage = Loadable(lazy(() => import("../Pages/SignupPage")));

const NotFound = Loadable(lazy(() => import("../Pages/Page404")));
