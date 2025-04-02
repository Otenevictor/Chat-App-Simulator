import React from 'react'
import { Navigate } from 'react-router';
import { UserAuth } from '../context/authcontext';

export const  ProtectedRoute = ({ children }) => {
  const { currentUser } = UserAuth();
   
    if (!currentUser) {
        return <Navigate to="/login" replace={true}/>; // Redirect to login page if not authenticated
    }
  return children; // Render the child components if authenticated
}

