import { AuthContext } from "./AuthContext";
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
interface PrivateRouteProps {
    element: JSX.Element;
    requiredLevel: number; // Mức độ quyền hạn yêu cầu
}
export const PrivateRoute:React.FC<PrivateRouteProps> = ({element,requiredLevel})=>{
    const auth = useContext(AuthContext);
    if (auth?.loading) {
        return <div>Loading...</div>; // Đợi token khôi phục trước khi render
      }
    if(!auth?.token){
        return  <Navigate to="/login" />;
    }
    if(!auth.user || auth.user.level === requiredLevel){
        return element;
    }
    return <Navigate to="/404-page" />;
}