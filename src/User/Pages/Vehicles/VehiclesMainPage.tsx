import Car from "./Car";
import VehiclesBanner from "./VehiclesBanner";

const VehiclesMainPage = () => {
    return (
        <div className="mb-[2000px]">
           <VehiclesBanner />
           <Car />
        </div>
    );
};

export default VehiclesMainPage;