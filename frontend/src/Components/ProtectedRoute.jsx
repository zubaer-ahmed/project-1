import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { useGlobalState } from '../Hooks/useGlobalState';
import { useLocation } from "react-router-dom";
import React from 'react';

export const ProtectedRoute = ({ children, redirect }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // user is not authenticated
  if (!user) {

    if (redirect && typeof redirect != 'string') // if tis a react component
      return redirect;
    return <Navigate to={`${redirect || '/login'}`} />;
  }
  return children;
};
