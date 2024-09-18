import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TCars } from "../../../Types/TCar";
import Swal from "sweetalert2";

const divisions = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Sylhet",
  "Barisal",
  "Rangpur",
];

const times = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00",
  "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
  "21:00", "22:00", "23:00"
];

const Booking = () => {
  const [pickUpDate, setPickUpDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10); // Default current date in 'YYYY-MM-DD' format
  });

  const [pickUpTime, setPickUpTime] = useState("10:00"); // Default pick-up time
  const [dropOffDate, setDropOffDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Default drop-off date to tomorrow
    return tomorrow.toISOString().slice(0, 10); // 'YYYY-MM-DD' format
  });

  const [dropOffTime, setDropOffTime] = useState("10:00"); // Default drop-off time
  const [selectedDropOff, setSelectedDropOff] = useState<"date-time" | "hour-range" | "return-time">("date-time"); // Default to "date-time"

  const [formData, setFormData] = useState({
    phone: "",
    pickUpLocation: "", // Changed to pickUpLocation
    dropOffLocation: "", // Added dropOffLocation
    zip: "",
    insurance: "",
    nidPassport: "",
    drivingLicense: "",
    dropOffHour: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car as TCars;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const requestData: any = {
      pickUp: formData.pickUpLocation,
      dropOff: formData.dropOffLocation,
      startDate: pickUpDate,
      startTime: pickUpTime,
      carId: car?._id,
      zipCode: formData.zip,
      insurance: formData.insurance,
      NIDPassPort: formData.nidPassport,
      DrivingLicense: formData.drivingLicense,
    };
  
    // Handle different drop-off types
    if (selectedDropOff === "date-time") {
      requestData.returnDate = dropOffDate;
      requestData.returnTime = dropOffTime;
    } else if (selectedDropOff === "hour-range") {
      const dropOffHour = Number(formData.dropOffHour);
      if (!isNaN(dropOffHour) && dropOffHour >= 0 && dropOffHour <= 23) {
        requestData.fixedTime = dropOffHour;
        requestData.returnDate = null;
        requestData.returnTime = null;
      } else {
        console.error("Invalid dropOffHour value. It must be a number between 0 and 23.");
        Swal.fire({
          title: 'Invalid Input',
          text: 'Please enter a valid hour range (0-23).',
          icon: 'error',
        });
        return;
      }
    } else if (selectedDropOff === "return-time") {
      // No need to set `returnDate` and `returnTime` explicitly, assuming server can handle missing fields
    }
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server Response:", errorResponse);
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          title: 'Booking Successful!',
          text: 'You will be redirected to MyBookings in 5 seconds.',
          icon: 'success',
          timer: 5000,
          timerProgressBar: true,
          didClose: () => {
            navigate("/my-bookings");
          }
        });
        console.log(result);
      } else {
        Swal.fire({
          title: 'Booking Failed',
          text: 'Please try again later.',
          icon: 'error'
        });
      }
    } catch (error) {
      console.error("Error posting data:", error);
      Swal.fire({
        title: 'An error occurred',
        text: 'Please try again later.',
        icon: 'error'
      });
    }
  };
  
  
  return (
    <div className="mt-20 px-4 md:px-0">
      <div className="md:max-w-xl lg:max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Booking Form</h2>
        {car ? (
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 md:gap-6 justify-center items-center flex-wrap">
              <img className="h-5 w-5 md:h-8 md:w-8 rounded-xl" src={car.image} alt={car.name} />
              <p className="text-[13px] md:text-sm lg:text-md font-bold">Name: {car.name}</p>
              <p className="text-[13px] md:text-sm lg:text-md font-bold">Price: {car.pricePerHour}$Hr</p>
              <p className="text-[13px] md:text-sm lg:text-md font-bold">Car Type: {car.carType}</p>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="block text-gray-700 mb-2">Pick-up Location</label>
                  <select
                    name="pickUpLocation"
                    value={formData.pickUpLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select pick-up location</option>
                    {divisions.map((division) => (
                      <option key={division} value={division}>{division}</option>
                    ))}
                  </select>

                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <div className="w-[115px]">
                      <label className="block text-gray-700 mb-2">Pick-up Date</label>
                      <input
                        type="date"
                        name="pickUpDate"
                        value={pickUpDate}
                        onChange={(e) => setPickUpDate(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-gray-700 mb-2">Pick-up Time</label>
                      <select
                        name="pickUpTime"
                        value={pickUpTime}
                        onChange={(e) => setPickUpTime(e.target.value)}
                        className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {times.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <label className="block text-gray-700 mb-2">Drop-off Location</label>
                  <select
                    name="dropOffLocation"
                    value={formData.dropOffLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select drop-off location</option>
                    {divisions.map((division) => (
                      <option key={division} value={division}>{division}</option>
                    ))}
                  </select>

                  <div className="flex gap-4 mt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedDropOff("date-time")}
                      className={`px-2 py-1 rounded-lg ${selectedDropOff === "date-time" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                      <p className="text-[12px]">Date & Time</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedDropOff("hour-range")}
                      className={`px-2 py-1 rounded-lg ${selectedDropOff === "hour-range" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                      <p className="text-[12px]">Hour Range</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedDropOff("return-time")}
                      className={`px-2 py-1 rounded-lg ${selectedDropOff === "return-time" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                      <p className="text-[12px]">Return Time</p>
                    </button>
                  </div>

                  {selectedDropOff === "date-time" && (
                    <div className="flex flex-col gap-4 mt-4">
                      <div className="w-[115px]">
                        <label className="block text-gray-700 mb-2">Drop-off Date</label>
                        <input
                          type="date"
                          name="dropOffDate"
                          value={dropOffDate}
                          onChange={(e) => setDropOffDate(e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="w-full">
                        <label className="block text-gray-700 mb-2">Drop-off Time</label>
                        <select
                          name="dropOffTime"
                          value={dropOffTime}
                          onChange={(e) => setDropOffTime(e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {times.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {selectedDropOff === "hour-range" && (
                    <div className="flex flex-col gap-4 mt-4">
                      <label className="block text-gray-700 mb-2">Drop-off Hour (24-hour format)</label>
                      <input
                        type="number"
                        name="dropOffHour"
                        value={formData.dropOffHour}
                        onChange={handleChange}
                        min="0"
                        max="23"
                        className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {selectedDropOff === "return-time" && (
                    <div className="flex flex-col gap-4 mt-4">
                      {/* No additional fields for "return-time" drop-off */}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-4">
                <div>
                  <label className="block text-gray-700 mb-2">Zip Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Insurance</label>
                  <input
                    type="text"
                    name="insurance"
                    value={formData.insurance}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">NID/Passport</label>
                  <input
                    type="text"
                    name="nidPassport"
                    value={formData.nidPassport}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Driving License</label>
                  <input
                    type="text"
                    name="drivingLicense"
                    value={formData.drivingLicense}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-6 hover:bg-blue-600"
              >
                Submit Booking
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-red-500">No car selected.</p>
        )}
      </div>
    </div>
  );
};

export default Booking;
