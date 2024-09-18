import React from "react";
import { FaDollarSign } from "react-icons/fa";
import { TCars } from "../../../Types/TCar";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../../utils/stroage";

interface CarCardProps {
  car: TCars;
  onViewDetails: (car: TCars) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onViewDetails }) => {
  const navigate = useNavigate();

  const handleRent = () => {
    try {
      const user = getUserData();
      //   console.log("Retrieved user data:", user);

      if (user) {
        navigate("/booking", { state: { car } });
      } else {
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("Error reading user data from localStorage:", error);
      navigate("/sign-in");
    }
  };

  const isAvailable = car.status === "available";

  return (
    <div className="">
      <div>
        <div className="bg-[#222] border border-gray-300 rounded-lg shadow-md overflow-hidden mx-auto h-[220px] md:h-[390px] car-card">
          <div className="car-image-container">
            <img
              className="w-full h-24 md:h-48 object-cover car-image"
              src={car.image}
              alt="Car Image"
            />
            <div className="car-overlay"></div>
          </div>
          <div>
            <div className=" px-2 md:px-4 mt-2 font bold text-white">
              <div className="">
                <h2 className="text-[10px] md:text-lg font-bold mb-1">
                  {car.name}
                </h2>
              </div>
              <div className="flex items-center text-sm  md:mb-2">
                <p className="font-bold text-[10px] md:text-sm">
                  {car.extra[0]?.age} years old
                </p>
              </div>
              <div className="flex items-center text-[10px]  md:text-sm ">
                <p>{car.carType}</p>
              </div>
              <div className="flex items-center justify-between md:mb-4">
                <span className="text-[10px] md:text-lg font-bold text-yellow-400">
                  <FaDollarSign className="inline mr-1" />
                  {car.pricePerHour}
                  <span className="text-gray-200 ml-1">Hr</span>
                </span>
                <button
                  onClick={() => onViewDetails(car)}
                  className="bg-yellow-500 text-[10px] md:text-[13px] px-1 py-1 text-white md:px-4 md:py-2 rounded-full hover:bg-yellow-600"
                >
                  View Details
                </button>
              </div>
            </div>

            <div
              onClick={isAvailable ? handleRent : undefined} // Only call handleRent if available
              className="text-center px-2 md:px-3 mt-1 md:mt-0"
            >
              <button
                disabled={!isAvailable} // Disable button if not available
                className={`px-6 py-1 w-full text-[10px] md:text-[16px] lg:text-[18px] font-semibold text-white transition-all duration-300 rounded-full shadow-md ${
                  isAvailable
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                {isAvailable ? "Rent Now" : "Sold Out"} 
               
              </button>
            </div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
