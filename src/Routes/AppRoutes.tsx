import { Suspense, lazy } from "react";
import { Loader } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import NotRequiredAuth from "./NotRequiredAuth";
import RoutePath from "@utils/Routepath";
import RequireAuth from "./RequiredAuth";
import Layout from "@components/Layout";

const LoginPage = lazy(() => import("@pages/auth/loginPage"));
const SignUpPage = lazy(() => import("@pages/auth/signUpPage"));
const Home = lazy(() => import("@pages/home"));
const MyProfile = lazy(() => import("@pages/myProfile"));
const Post = lazy(() => import("@pages/post"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<NotRequiredAuth />}>
          <Route path={RoutePath.login} element={<LoginPage />} />
          <Route path={RoutePath.signup} element={<SignUpPage />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path={RoutePath.home} element={<Home />} />
            <Route path={RoutePath.myprofile} element={<MyProfile />} />
            <Route path={"/:id"} element={<Post />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
