import { FC, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import RequireAuth from "./RequireAuth";

const Collections = lazy(() => import("../../pages/collections/Collections"));
const Collection= lazy(() => import("../../pages/collection/Collection"));
const Listings = lazy(() => import("../../pages/listings/Listings"));
const CreateListing = lazy(() => import("../../pages/create-listing/Create-listing"));
const Login = lazy(() => import("../../pages/login/Login"));
const Register = lazy(() => import("../../pages/register/Register"));
const NotFound = lazy(() => import("../../pages/404/NotFound"));
const Profile = lazy(() => import("../../pages/profile/Profile"));

const AppRoutes: FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Routes>
      <Route path={"/"}>
        <Route index element={<Collections />} />
        <Route path={"collections"} element={<Collections />} />
        <Route path="collection/:id" element={<Collection />} />
        <Route path={"listings"} element={<Listings />} />
        <Route path={"create-listing"} element={<CreateListing />} />
        <Route path={"login"} element={<Login />} />
        <Route path={"register"} element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path={"profile"} element={<Profile />} />
        </Route>
        <Route path={"*"} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
