import { ReactNode } from "react";
import { useAppSelector } from "../Redux/hook";
import { useCurrentToken } from "../Redux/Fetures/loginSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}:{children: ReactNode}) => {
    const token = useAppSelector(useCurrentToken);
    if(!token){
        return <Navigate to="/sign-up" replace={true}></Navigate>
    }
    return children;
};

export default ProtectedRoute;