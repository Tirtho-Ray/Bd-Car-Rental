import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import TextAnimation from "./TextAnimation";

interface VehiclesBannerProps {
  onSearch: (searchTerm: string) => void;
  onTypeChange: (type: string) => void;
  onPriceChange: (price: string) => void;
  onRangeChange: (minPrice: number, maxPrice: number) => void;
}

const VehiclesBanner: React.FC<VehiclesBannerProps> = ({ onSearch, onTypeChange, onPriceChange, onRangeChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  useEffect(() => {
    setSearchTerm("");
    setSelectedType("");
    setSelectedPrice("");
    setMinPrice(0);
    setMaxPrice(5000);
  }, []);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    onTypeChange(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrice(e.target.value);
    onPriceChange(e.target.value);
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setMaxPrice(value);
    onRangeChange(minPrice, value);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setSelectedPrice("");
    setMinPrice(0);
    setMaxPrice(5000);
    onSearch(""); // Reset search term
    onTypeChange(""); // Reset car type
    onPriceChange(""); // Reset price filter
    onRangeChange(0, 5000); // Reset price range
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            className="bg-transparent outline-none text-black px-2 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px]"
          />
          <button onClick={handleSearch} className="text-black ml-2">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Conditionally Render Filters - Positioned at the Bottom Right */}
      <div className="absolute bottom-0 right-0 mb-4 mr-4 flex flex-col items-end gap-2 z-10">
        <select
          value={selectedPrice}
          onChange={handlePriceChange}
          className="bg-white bg-opacity-80 px-2 py-1 rounded-full outline-none text-black text-xs sm:text-sm"
        >
          <option value="">Filter price</option>
          <option value="high">Low to High</option>
          <option value="low">High to Low</option>
        </select>

        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="bg-white bg-opacity-80 px-2 py-1 rounded-full outline-none text-black text-xs sm:text-sm"
        >
          <option value="">Car Types</option>
          <option value="SUVs">SUV</option>
          <option value="Van">Van</option>
          <option value="Electric vehicles">Electric vehicles</option>
          <option value="Small cars">Small cars</option>
        </select>
        {/* "Van"|
  "4 Wheel drives"|
  "Electric vehicles"|
  "SUVs"|
  "Small cars" */}
        <div className="flex flex-col items-end hidden">
          <input
            type="range"
            min="0"
            max="500"
            value={maxPrice}
            onChange={handleRangeChange}
            className="w-[100px] sm:w-[100px] md:w-[100px] lg:w-[100px] h-2 bg-yellow-400 rounded-full cursor-pointer"
          />
          <span className="text-white text-xs sm:text-sm mt-1">${minPrice} - ${maxPrice}</span>
        </div>

        <button
          onClick={handleResetFilters}
          className="bg-red-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm mt-2"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default VehiclesBanner;
