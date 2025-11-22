import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({
  children,
  user,
  redirect = "/login",
  loadingUser,
  loadingSubscription,
}) => {
  if (!loadingUser & !loadingSubscription) {
    if (!user) return <Navigate to={redirect} />;

    return children ? children : <Outlet />;
  }
};

export default ProtectRoute;
