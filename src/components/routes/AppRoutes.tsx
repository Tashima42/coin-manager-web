import { FC, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const Collections = lazy(() => import("../../pages/collections/Collections"));
const Collection= lazy(() => import("../../pages/collection/Collection"));
const Listings = lazy(() => import("../../pages/listings/Listings"));
const Transactions = lazy(() => import("../../pages/transactions/Transactions"));
const Receipts = lazy(() => import("../../pages/receipts/Receipts"));
const CreateListing = lazy(() => import("../../pages/create-listing/Create-listing"));
const Listing = lazy(() => import("../../pages/listing/Listing"));
const Receipt = lazy(() => import("../../pages/receipt/Receipt"));
const Login = lazy(() => import("../../pages/login/Login"));
const Register = lazy(() => import("../../pages/register/Register"));
const NotFound = lazy(() => import("../../pages/404/NotFound"));

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
        <Route path={"transactions"} element={<Transactions />} />
        <Route path={"receipts"} element={<Receipts />} />
        <Route path={"create-listing"} element={<CreateListing />} />
        <Route path={"listing/:id"} element={<Listing />} />
        <Route path={"receipt/:id"} element={<Receipt />} />
        <Route path={"login"} element={<Login />} />
        <Route path={"register"} element={<Register />} />
        <Route path={"*"} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
