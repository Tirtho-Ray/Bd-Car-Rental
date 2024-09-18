import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Car from "./Car";
import VehiclesBanner from "./VehiclesBanner";

const VehiclesMainPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [searchTerm, setSearchTerm] = useState(queryParams.get('searchTerm') || "");
  const [selectedType, setSelectedType] = useState(queryParams.get('selectedType') || "");
  const [selectedPrice, setSelectedPrice] = useState(queryParams.get('selectedPrice') || "");
  const [minPrice, setMinPrice] = useState(Number(queryParams.get('minPrice')) || 0);
  const [maxPrice, setMaxPrice] = useState(Number(queryParams.get('maxPrice')) || 5000);

  useEffect(() => {
    // Sync state with URL parameters
    const params = new URLSearchParams();
    if (searchTerm) params.set('searchTerm', searchTerm);
    if (selectedType) params.set('selectedType', selectedType);
    if (selectedPrice) params.set('selectedPrice', selectedPrice);

    navigate(`?${params.toString()}`, { replace: true });
  }, [searchTerm, selectedType, selectedPrice, minPrice, maxPrice, navigate]);

  return (
    <div className="mb-[2000px]">
      <VehiclesBanner
        onSearch={setSearchTerm}
        onTypeChange={setSelectedType}
        onPriceChange={setSelectedPrice}
        onRangeChange={(min, max) => {
          setMinPrice(min);
          setMaxPrice(max);
        }}
      />
      <Car 
        searchTerm={searchTerm} 
        selectedType={selectedType} 
        selectedPrice={selectedPrice}
      />
    </div>
  );
};

export default VehiclesMainPage;
