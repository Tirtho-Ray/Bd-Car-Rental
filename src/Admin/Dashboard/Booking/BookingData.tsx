import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingData = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    returnDate: '',
    returnTime: '',
    status: 'available'
  });

  // Fetch bookings function
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/all-bookings', {
        headers: {
          Authorization: `${token}`,
        },
      });

      setBookings(response.data.data);
      setFilteredBookings(response.data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search function
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = bookings.filter(
      (booking: any) =>
        booking.user.name.toLowerCase().includes(query) ||
        booking.user.email.toLowerCase().includes(query) ||
        booking.carId._id.toLowerCase().includes(query)
    );
    setFilteredBookings(filtered);
  };

  // Open the modal and set current booking for editing
  const handleEdit = (booking: any) => {
    setCurrentBooking(booking);
    setUpdatedData({
      returnDate: booking.returnDate || '',
      returnTime: booking.returnTime || '',
      status: 'available',
    });
    setIsModalOpen(true);
  };

  // Handle update input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle booking update submission
  const handleUpdateSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        'http://localhost:5000/cars/return',
        {
          bookingId: currentBooking?._id,
          returnDate: updatedData.returnDate,
          returnTime: updatedData.returnTime,
          status: updatedData.status,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      // Refetch bookings after update
      fetchBookings();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by user name, email, or car code"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking: any) => (
              <div key={booking._id} className="border shadow-lg p-4 rounded-lg">
                <img
                  src={booking.carId.image}
                  alt={booking.carId.name}
                  className="w-full h-40 object-cover rounded"
                />
                 <h3 className="text-lg font-bold mt-2">{booking.carId.name}</h3>
                <p className="text-sm">Type: {booking.carId.carType}</p>
                <p className="text-sm">Price per hour: ${booking.carId.pricePerHour}</p>
                <p className="mt-2 font-semibold">User: {booking.user.name}</p>
                <p className="text-sm">Email: {booking.user.email}</p>
                <p className="text-sm">Zip Code: {booking?.zipCode}</p>
                <p className="mt-2">Pick-up: {booking?.pickUp}</p>
                <p className="text-sm">Drop-off: {booking?.dropOff}</p>
                <p className="text-sm">Start-Date: {booking?.startDate}</p>
                <p className="text-sm">Start Time: {booking?.startTime}</p>
                <p className="text-sm">Return Date: {booking?.returnDate}</p>
                <p className="text-sm">Return Time: {booking?.returnTime}</p>
                <p className="text-sm mt-2 mb-2 font-bold">Total Price: {booking?.totalCost}</p>
                {booking?.fixedTime && (
                  <p className="text-sm">End Time: {booking.fixedTime}HR</p>
                )}

                <button
                  className="w-full px-4 mt-3 bg-blue-500 text-white py-2 rounded text-sm font-semibold hover:bg-blue-600 transition duration-150"
                  onClick={() => handleEdit(booking)}
                >
                  Edit car
                </button>
              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Car Booking</h2>
            <div>
              <label className="block">Return Date</label>
              <input
                type="date"
                name="returnDate"
                value={updatedData.returnDate}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
              <label className="block">Return Time</label>
              <input
                type="time"
                name="returnTime"
                value={updatedData.returnTime}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />
              <button
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleUpdateSubmit}
              >
                Save Changes
              </button>
              <button
                className="w-full px-4 py-2 mt-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingData;
