import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import Layout from "./components/layout/Layout";
import { BrowserRouter } from "react-router-dom";
import Loader from "./components/loader/Loader";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Layout>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </Layout>
  </BrowserRouter>
);
