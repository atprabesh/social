import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NotRequiredAuth = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (auth?.isLoggedIn) {
      if (from === "/login") {
        navigate("/404", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  }, [auth?.isLoggedIn]);

  return <>{!auth?.isLoggedIn && <Outlet />}</>;
};

export default NotRequiredAuth;
