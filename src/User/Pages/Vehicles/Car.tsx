import { useState } from "react";
import { useGetAllCarQuery } from "../../../Redux/Api/Car/carApi";
import { TCars } from "../../../Types/TCar";
import CarCard from "./CarCard";
import CarModal from "./CarModal";

interface CarProps {
  searchTerm: string;
  selectedType: string;
  selectedPrice: string;
}

const Car: React.FC<CarProps> = ({ searchTerm, selectedType, selectedPrice }) => {
  const { data, isLoading, isError } = useGetAllCarQuery("");

  const [selectedCar, setSelectedCar] = useState<TCars | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  if (isError) return <p>Error fetching data.</p>;

  let cars: TCars[] = data?.data || [];

  // Filter cars based on search term
  if (searchTerm) {
    cars = cars.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter cars based on selected type
  if (selectedType) {
    cars = cars.filter((car) => car.carType === selectedType);
  }

  // Sort cars based on selected price
  if (selectedPrice === "high") {
    cars = [...cars].sort((a, b) => a.pricePerHour - b.pricePerHour);
  } else if (selectedPrice === "low") {
    cars = [...cars].sort((a, b) => b.pricePerHour - a.pricePerHour);
  }

  const handleViewDetails = (car: TCars) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 md:px-20 lg:px-0 px-2">
      {cars.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} onViewDetails={handleViewDetails} />
          ))}
        </div>
      ) : (
        <p className="text-center text-white">No cars found.</p>
      )}

      {/* Render the modal and pass the selected car */}
      {selectedCar && (
        <CarModal
          car={selectedCar}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Car;
