import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateProps {
    children: React.ReactNode;
}

const Private: React.FC<PrivateProps> = ({ children }) => {
    let token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default Private;
