import { Navigate, Outlet } from "react-router-dom";
import { useUserInfo } from "@/lib/utils";

const PrivateRoute = () => {
  const userInfo = useUserInfo();
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
