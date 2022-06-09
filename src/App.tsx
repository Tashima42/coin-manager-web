import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./components/routes/AppRoutes";
import FallbackComponent from "./components/errorFallback/FallbackComponent";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

const App: FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={() => navigate("/")}
    >
      <AppRoutes />
    </ErrorBoundary>
  );
};

export default App;
