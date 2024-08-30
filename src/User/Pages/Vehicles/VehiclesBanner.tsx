import { FaSearch } from 'react-icons/fa';
import TextAnimation from './TextAnimation';

const VehiclesBanner = () => {
    return (
        <div className="relative h-[350px]">
            {/* Background Image with Overlay */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <img
                    className="w-full h-full object-cover"
                    src="https://webredox.net/demo/wp/renax/wp-content/uploads/2024/04/1.jpg"
                    alt="Descriptive Alt Text"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            {/* Centered Text Animation and Search Bar */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <TextAnimation />
                <div className="flex items-center justify-center bg-white bg-opacity-80 px-4 py-2 rounded-full mb-4">
                    <input
                        type="text"
                        placeholder="Search for a car..."
                        className="bg-transparent outline-none text-black px-2 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px]"
                    />
                    <FaSearch className="text-black ml-2" />
                </div>
            </div>

            {/* Dropdown and Price Range - Positioned at the Bottom Right */}
            <div className="absolute bottom-0 right-0 mb-4 mr-4 flex flex-col items-end gap-2 z-10">
                {/* Vehicle Type Dropdown */}
                <select className="bg-white bg-opacity-80 px-2 py-1 rounded-full outline-none text-black text-xs sm:text-sm">
                    <option value="SUV">SUV</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Sedan">Sedan</option>
                </select>

                {/* Price Range Slider */}
                <div className="flex flex-col items-end">
                    <input
                        type="range"
                        min="0"
                        max="5000"
                        className="w-[100px] sm:w-[100px] md:w-[100px] lg:w-[100px] h-2 bg-yellow-400 rounded-full cursor-pointer"
                    />
                    <span className="text-white text-xs sm:text-sm mt-1">$0 - $5000</span>
                </div>
            </div>
        </div>
    );
};

export default VehiclesBanner;
