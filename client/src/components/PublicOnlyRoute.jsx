import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isAuthenticated) {
    const from = location.state?.from?.pathname;
    if (from) {
      return <Navigate to={from} replace />;
    }
    if (user?.role === "Owner") {
      return <Navigate to="/owner" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
