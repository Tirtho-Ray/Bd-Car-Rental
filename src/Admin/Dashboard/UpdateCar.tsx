import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface ICarForm {
  name: string;
  image: string;
  featuresImage: string[];
  carCode: string;
  description: string;
  color: string;
  features: string[];
  carType: string;
  pricePerHour: number;
  age: number;
  seats: number;
  largeBags: number;
  smallBags: number;
  engineCapacity: string;
  transmission: string;
  fuelType: string;
  fuelConsumption: string;
}

const UpdateCar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ICarForm>({
    name: "",
    image: "",
    featuresImage: [],
    carCode: "",
    description: "",
    color: "",
    features: [],
    carType: "",
    pricePerHour: 0,
    age: 0,
    seats: 0,
    largeBags: 0,
    smallBags: 0,
    engineCapacity: "",
    transmission: "",
    fuelType: "",
    fuelConsumption: "",
  });

  useEffect(() => {
    const fetchCar = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:5000/cars/${id}`, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (result.success) {
          const car = result.data;
          setFormData({
            name: car.name,
            image: car.image,
            featuresImage: car.featuresImage,
            carCode: car.carCode,
            description: car.description,
            color: car.color,
            features: car.features,
            carType: car.carType,
            pricePerHour: car.pricePerHour,
            age: car.extra[0].age,
            seats: car.extra[0].seats,
            largeBags: car.extra[0].largeBags,
            smallBags: car.extra[0].smallBags,
            engineCapacity: car.extra[0].engineCapacity,
            transmission: car.extra[0].transmission,
            fuelType: car.extra[0].fuelType,
            fuelConsumption: car.extra[0].fuelConsumption,
          });
        } else {
          console.error("Error fetching car:", result.message);
        }
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    };

    fetchCar();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const fileUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormData((prevData) => ({
        ...prevData,
        [name]: fileUrls,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/cars/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        Swal.fire("Success!", "Car updated successfully.", "success");
        navigate("/admin-dashboard/Product");
      } else {
        Swal.fire("Error!", result.message, "error");
      }
    } catch (error) {
      console.error("Error updating car:", error);
      Swal.fire("Error!", "Failed to update car.", "error");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Update Car</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 bg-gray-50 rounded-lg shadow-md"
      >
        {/* Text Fields */}
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Car Name"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold mb-1">
            Image
          </label>
          <input
            id="image"
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="carCode" className="font-semibold mb-1">
            Car Code
          </label>
          <input
            id="carCode"
            type="text"
            name="carCode"
            value={formData.carCode}
            onChange={handleChange}
            placeholder="Car Code"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="color" className="font-semibold mb-1">
            Color
          </label>
          <input
            id="color"
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Color"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="pricePerHour" className="font-semibold mb-1">
            Price Per Hour
          </label>
          <input
            id="pricePerHour"
            type="number"
            name="pricePerHour"
            value={formData.pricePerHour}
            onChange={handleChange}
            placeholder="Price Per Hour"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        {/* File Inputs */}
        <div className="flex flex-col">
          <label htmlFor="image" className="font-semibold mb-1">
            Image URL
          </label>
          <input
            id="image"
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="featuresImage" className="font-semibold mb-1">
            Features Images
          </label>
          <input
            id="featuresImage"
            type="file"
            name="featuresImage"
            multiple
            onChange={handleFileChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        {/* Select Fields */}
        <div className="flex flex-col">
          <label htmlFor="carType" className="font-semibold mb-1">
            Car Type
          </label>
          <select
            id="carType"
            name="carType"
            value={formData.carType}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Select Car Type</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
            {/* Add other options as needed */}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="age" className="font-semibold mb-1">
            Age
          </label>
          <input
            id="age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="seats" className="font-semibold mb-1">
            Seats
          </label>
          <input
            id="seats"
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            placeholder="Seats"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="largeBags" className="font-semibold mb-1">
            Large Bags
          </label>
          <input
            id="largeBags"
            type="number"
            name="largeBags"
            value={formData.largeBags}
            onChange={handleChange}
            placeholder="Large Bags"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="smallBags" className="font-semibold mb-1">
            Small Bags
          </label>
          <input
            id="smallBags"
            type="number"
            name="smallBags"
            value={formData.smallBags}
            onChange={handleChange}
            placeholder="Small Bags"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="engineCapacity" className="font-semibold mb-1">
            Engine Capacity
          </label>
          <input
            id="engineCapacity"
            type="text"
            name="engineCapacity"
            value={formData.engineCapacity}
            onChange={handleChange}
            placeholder="Engine Capacity"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="transmission" className="font-semibold mb-1">
            Transmission
          </label>
          <input
            id="transmission"
            type="text"
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            placeholder="Transmission"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="fuelType" className="font-semibold mb-1">
            Fuel Type
          </label>
          <input
            id="fuelType"
            type="text"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            placeholder="Fuel Type"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="fuelConsumption" className="font-semibold mb-1">
            Fuel Consumption
          </label>
          <input
            id="fuelConsumption"
            type="text"
            name="fuelConsumption"
            value={formData.fuelConsumption}
            onChange={handleChange}
            placeholder="Fuel Consumption"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Car
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;
