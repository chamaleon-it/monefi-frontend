import React from "react";
import { authContext } from "./AuthProvider";

export const useAuth = () => {
  const context = React.useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
