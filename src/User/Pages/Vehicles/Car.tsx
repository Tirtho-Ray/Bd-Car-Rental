import { FaCartPlus, FaDollarSign } from "react-icons/fa";
import './Car.css'; // Import your custom CSS file

const Car = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto mt-10 md:px-20 lg:px-0 gap-3 px-2">
      <div className="bg-[#222] border border-gray-300 rounded-lg shadow-md overflow-hidden mx-auto h-[220px] md:h-[400px] car-card">
        <div className="car-image-container">
          <img
            className="w-full h-24 md:h-48 object-cover car-image"
            src="https://webredox.net/demo/wp/renax/wp-content/uploads/2024/04/1.jpg"
            alt="Car Image"
          />
          <div className="car-overlay"></div>
        </div>
        <div className="p-4 font bold text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-sm md:text-lg font-bold  mb-1">
              Lamborghini
            </h2>
            <h2 className="p-2 border border-transparent text-white h-10 w-10 rounded-full flex items-center justify-center hover:border-yellow-300 transition-all duration-300 ease-in-out lg:text-[20px]">
              <FaCartPlus />
            </h2>
          </div>
          <div className="flex items-center text-sm mb-4">
            <p className="font-bold">4 years old</p>
          </div>
          <div className="flex items-center text-sm  mb-4">
            <p>SUV</p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] md:text-lg font-bold text-yellow-400">
              <FaDollarSign className="inline mr-1" />
              20,000 <span className="text-gray-200">Hr</span>
            </span>
            <button className="bg-yellow-500 text-[13px] px-1 py-1 text-white md:px-4 md:py-2 rounded-full hover:bg-yellow-600">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Add additional car cards here */}
    </div>
  );
};

export default Car;
