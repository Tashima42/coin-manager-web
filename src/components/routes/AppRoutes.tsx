import React, { FC, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import RequireAuth from "./RequireAuth";

const Home = lazy(() => import("../../pages/home/Home"));
const Login = lazy(() => import("../../pages/login/Login"));
const Register = lazy(() => import("../../pages/register/Register"));
const NotFound = lazy(() => import("../../pages/404/NotFound"));
const CreatePost = lazy(() => import("../../pages/createPost/CreatePost"));
const Profile = lazy(() => import("../../pages/profile/Profile"));
const Post = lazy(() => import("../../pages/post/Post"));
const About = lazy(() => import("../../pages/about/About"));
const Contact = lazy(() => import("../../pages/contact/Contact"));

const AppRoutes: FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Routes>
      <Route path={"/"}>
        <Route index element={<Home />} />
        <Route path={"login"} element={<Login />} />
        <Route path={"register"} element={<Register />} />
        <Route path={"posts/:postId"} element={<Post />} />
        <Route path={"about"} element={<About />} />
        <Route path={"contact"} element={<Contact />} />
        <Route element={<RequireAuth />}>
          <Route path={"create"} element={<CreatePost />} />
          <Route path={"profile"} element={<Profile />} />
        </Route>
        <Route path={"*"} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
