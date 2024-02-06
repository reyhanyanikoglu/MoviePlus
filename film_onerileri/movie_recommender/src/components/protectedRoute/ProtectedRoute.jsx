import React from "react";
import { userAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = userAuth();

  if (!user) {
    //kullanıcı yoksa profil kısmı gelmeyecek ana ekrana döndürecek
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
