// import { Navigate } from "react-router-dom";
// const ProtectedRoute = ({ isLoggedIn, children }) => {
//   if (!isLoggedIn) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };
// export default ProtectedRoute;
import { Route, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ role, ...rest }) => {
  const currentRole = JSON.parse(localStorage.getItem("rolekey"));
  if (currentRole === role) {
    return <Route {...rest} />;
  } else {
    return (
      <Navigate
        to={{
          pathname: currentRole ? "/" : "/login",
          state: {
            from: rest.location
          }
        }}
      />
    );
  }
};