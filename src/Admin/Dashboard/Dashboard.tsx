import { Outlet } from "react-router-dom";
import DashNav from "./DashNav";

const Dashboard = () => {
    return (
        <div className="flex h-screen">
            {/* Sticky navigation */}
           <div className="sticky top-0 h-screen">
           <DashNav  />
           </div>
            
            {/* Outlet section with scrollable content */}
            <div className="flex-1 p-6 overflow-y-auto bg-white">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
