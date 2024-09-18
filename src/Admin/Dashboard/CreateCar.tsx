import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

const CreateCar = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICarForm>();
  const [features, setFeatures] = useState<string[]>([""]);
  const [featuresImages, setFeaturesImages] = useState<string[]>([""]);
  const [loading, setLoading] = useState<boolean>(false); // State for loader
  const [succeed, setSucceed] = useState<boolean>(false); // State for success
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ICarForm> = async (data) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Prepare payload
      const payload = {
        ...data,
        pricePerHour: Number(data.pricePerHour),
        featuresImage: featuresImages,
        features: features.length ? features : [],
        extra: [
          {
            age: Number(data.age),
            seats: Number(data.seats),
            largeBags: Number(data.largeBags),
            smallBags: Number(data.smallBags),
            engineCapacity: data.engineCapacity,
            transmission: data.transmission,
            fuelType: data.fuelType,
            fuelConsumption: String(data.fuelConsumption),
          },
        ],
      };

      const response = await axios.post(
        "http://localhost:5000/create-cars",
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data.succeed) {
        // Trigger SweetAlert2 on success
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Car created successfully!",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          reset(); // Reset the form fields
          setFeatures([""]); // Reset features state
          setFeaturesImages([""]); // Reset featuresImages state
          setSucceed(true); // Set succeed to true to show success message
          setError(null); // Clear any existing error message
          navigate("/admin-dashboard"); // Redirect after showing the alert
        }, 2000);

        reset();
        setFeatures([""]);
        setFeaturesImages([""]);
      }
    } catch (error: any) {
      if (error.response) {
        // Extract validation errors if present
        if (error.response.data.errorSources) {
          const messages = error.response.data.errorSources
            .map((err: any) => err.message)
            .join(", ");
          setError(messages);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        setError("An error occurred while creating the car.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle dynamic inputs for features
  const addFeatureInput = () => {
    setFeatures([...features, ""]);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  const removeFeatureInput = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  // Handle dynamic inputs for feature images
  const addFeatureImageInput = () => {
    setFeaturesImages([...featuresImages, ""]);
  };

  const handleFeatureImageChange = (index: number, value: string) => {
    const updatedFeaturesImages = [...featuresImages];
    updatedFeaturesImages[index] = value;
    setFeaturesImages(updatedFeaturesImages);
  };

  const removeFeatureImageInput = (index: number) => {
    const updatedFeaturesImages = featuresImages.filter((_, i) => i !== index);
    setFeaturesImages(updatedFeaturesImages);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create a New Car
      </h2>
      {loading && <div className="loader">Submitting...</div>}

      {/* Show success message if succeed is true */}
      {succeed && (
        <div className="text-green-500 text-center">
          Car created successfully! Redirecting...
        </div>
      )}
      {!loading && !succeed && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Car Name
            </label>
            <input
              {...register("name", { required: "Car name is required" })}
              type="text"
              className="mt-1 py-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Car name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          {/* Car Image */}
          <div>
            <label className="block text-gray-700">Car Image</label>
            <input
              {...register("image", { required: "Car image URL is required" })}
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter main image URL"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>
          {/* Car Features Images */}
          <div>
            <label className="block text-gray-700">Car Features Images</label>
            {featuresImages.map((image, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) =>
                    handleFeatureImageChange(index, e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={`Image URL ${index + 1}`}
                />
                {featuresImages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeatureImageInput(index)}
                    className="px-3 py-1 text-white bg-red-500 rounded-md"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addFeatureImageInput}
              className="mt-2 px-4 py-2 text-white bg-green-500 rounded-md"
            >
              Add Another Image
            </button>
          </div>
          {/* Car Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Car Code
            </label>
            <input
              {...register("carCode", { required: "Car code is required" })}
              type="text"
              className="mt-1 py-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Car unique code"
            />
            {error && (
              <div className="text-red-600 bg-red-100 p-4 rounded">{error}</div>
            )}

            {errors.carCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.carCode.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Car description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              {...register("color")}
              type="text"
              className="mt-1 py-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
              placeholder="Car color"
            />
          </div>
          {/* Features - Dynamic Inputs */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Features
            </label>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="block py-2 p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Feature"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeFeatureInput(index)}
                  className="bg-red-500 text-white rounded-full p-2 hover:bg-red-700"
                  disabled={features.length === 1}
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeatureInput}
              className="mt-2 bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-700"
            >
              + Add Feature
            </button>
          </div>
          {/* Car Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Car Type
            </label>
            <select
              {...register("carType")}
              className="mt-1 py-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="Van">Van</option>
              <option value="4 Wheel drives">4 Wheel drives</option>
              <option value="Electric vehicles">Electric vehicles</option>
              <option value="SUVs">SUVs</option>
              <option value="Small cars">Small cars</option>
            </select>
          </div>
          {/* Price Per Hour */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price Per Hour
            </label>
            <input
              {...register("pricePerHour", {
                required: "Price is required",
                valueAsNumber: true,
                validate: (value) =>
                  value > 0 || "Price must be greater than 0",
              })}
              type="number"
              className="mt-1 py-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Price"
            />
            {errors.pricePerHour && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pricePerHour.message}
              </p>
            )}
          </div>
          {/* Age, Seats, Bags */}
          <div className="grid grid-cols-3 gap-4">
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                {...register("age", {
                  required: "Car age is required",
                  valueAsNumber: true,
                  validate: (value) =>
                    value >= 0 || "Price must be greater than 0",
                })}
                type="number"
                className="mt-1 py-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Car age"
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Seats
              </label>
              <input
                {...register("seats", {
                  required: "Number of seats is required",
                  valueAsNumber: true,
                  validate: (value) =>
                    value > 0 || "Price must be greater than 0",
                })}
                type="number"
                className="mt-1 py-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Seats"
              />
              {errors.seats && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.seats.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Large Bags
              </label>
              <input
                {...register("largeBags", {
                  required: "Number of large bags is required",
                  valueAsNumber: true,
                  validate: (value) =>
                    value >= 0 || "Price must be greater than 0",
                })}
                type="number"
                className="mt-1 py-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Large bags"
              />
              {errors.largeBags && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.largeBags.message}
                </p>
              )}
            </div>
          </div>
          {/* Small Bags */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Small Bags
            </label>
            <input
              {...register("smallBags", {
                required: "Number of small bags is required",
                valueAsNumber: true,
                validate: (value) =>
                  value >= 0 || "Price must be greater than 0",
              })}
              type="number"
              className="mt-1 py-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Small bags"
            />
            {errors.smallBags && (
              <p className="text-red-500 text-sm mt-1">
                {errors.smallBags.message}
              </p>
            )}
          </div>
          {/* Engine Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Engine Capacity
            </label>
            <input
              {...register("engineCapacity", {
                required: "Engine capacity is required",
              })}
              type="text"
              className="mt-1 py-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., 2.0L"
            />
            {errors.engineCapacity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.engineCapacity.message}
              </p>
            )}
          </div>
          {/* Transmission */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transmission
            </label>
            <select
              {...register("transmission")}
              className="mt-1 py-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
          {/* Fuel Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fuel Type
            </label>
            <select
              {...register("fuelType")}
              className="mt-1 py-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          {/* Fuel Consumption */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fuel Consumption
            </label>
            <input
              {...register("fuelConsumption")}
              type="text"
              className="mt-1 py-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., 8L/100km"
            />
          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Car
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateCar;
