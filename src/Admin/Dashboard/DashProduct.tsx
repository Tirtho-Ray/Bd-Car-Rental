import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// Define the interface for car data
interface Car {
  _id: string;
  name: string;
  image: string;
  carCode: string;
  carType: string;
  pricePerHour: number;
  status: string;
  isDeleted: boolean; // Add 'isDeleted' field to the Car interface
}

const DashProduct: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  // Fetch car data from API
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:5000/cars", {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const cars = data.data; // Adjust according to API response
        setCars(cars);
        setFilteredCars(cars.filter((car: Car) => !car.isDeleted)); // Filter out deleted cars
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchData();
  }, []);

  // Handle search by carCode only
  useEffect(() => {
    if (searchTerm) {
      const results = cars.filter(
        (car) =>
          (car.carCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
          !car.isDeleted
      );
      setFilteredCars(results);
    } else {
      setFilteredCars(cars.filter((car) => !car.isDeleted));
    }
  }, [searchTerm, cars]);

  // Handle delete car
  const handleDelete = (carId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        fetch(`http://localhost:5000/cars/${carId}`, {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then(() => {
            // Remove the deleted car from the state
            setFilteredCars(filteredCars.filter((car) => car._id !== carId));
            setCars(cars.filter((car) => car._id !== carId));
            Swal.fire("Deleted!", "Your car has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting car:", error);
            Swal.fire(
              "Error!",
              "There was a problem deleting the car.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="p-4">
      {/* Small Header */}
      <h1 className="text-lg font-semibold mb-4">Car Management</h1>

      {/* Search and Create Car button area */}
      <div className="flex items-center justify-between mb-4">
        {/* Search Field (smaller size) */}
        <input
          type="text"
          placeholder="Search by Car Code..."
          className="border border-gray-300 rounded p-2 text-sm w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Create Car Button */}
        <Link to="/admin-dashboard/create-car">
          <button className="ml-4 bg-green-500 text-white px-4 py-2 rounded text-sm">
            Create Car
          </button>
        </Link>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 border">Serial</th>
              <th className="px-2 py-1 border">Image</th>
              <th className="px-2 py-1 border">Name</th>
              <th className="px-2 py-1 border">Car Code</th>
              <th className="px-2 py-1 border">Car Type</th>
              <th className="px-2 py-1 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.length > 0 ? (
              filteredCars.map((car, index) => (
                <tr key={car._id}>
                  <td className="px-2 py-1 border text-center">{index + 1}</td>
                  <td className="px-2 py-1 border text-center">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-2 py-1 border text-center">{car.name}</td>
                  <td className="px-2 py-1 border text-center">
                    {car.carCode}
                  </td>
                  <td className="px-2 py-1 border text-center">
                    {car.carType}
                  </td>
                  <td className="px-2 py-1 border text-center">
                    <div>
                      <Link to={`/admin-dashboard/update-car/${car._id}`}>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs mr-1">
                          Edit
                        </button>
                      </Link>
                    </div>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                      onClick={() => handleDelete(car._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-2">
                  No cars found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashProduct;
