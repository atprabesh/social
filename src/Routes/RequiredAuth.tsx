import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import RoutePath from "../utils/Routepath";

const RequireAuth = () => {
  const location = useLocation();
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.isLoggedIn) {
      navigate(RoutePath.login, { state: { from: location } });
    }
  }, [auth?.isLoggedIn]);

  return <>{auth?.isLoggedIn && <Outlet />}</>;
};

export default RequireAuth;
